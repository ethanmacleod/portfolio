import { json } from '@sveltejs/kit';
import { increment, get, hGet, hSet, expire } from '$lib/server/redis';
import type { RequestHandler } from './$types';

const HIGH_FIVE_KEY = 'highfives:count';
const RATE_LIMIT_PREFIX = 'highfives:ratelimit:';
const MAX_HIGH_FIVES = 5;
const RATE_LIMIT_WINDOW = 30;

function getClientIP(request: Request): string {
	const forwarded = request.headers.get('x-forwarded-for');
	const realIP = request.headers.get('x-real-ip');
	const cfIP = request.headers.get('cf-connecting-ip');

	return cfIP || realIP || forwarded?.split(',')[0] || 'unknown';
}

export const GET: RequestHandler = async () => {
	try {
		const count = await get(HIGH_FIVE_KEY);
		return json({ count: parseInt(count || '0') });
	} catch (error) {
		console.error('Error getting high five count:', error);
		return json({ count: 0 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const clientIP = getClientIP(request);
		const rateLimitKey = `${RATE_LIMIT_PREFIX}${clientIP}`;

		const currentCount = await hGet(rateLimitKey, 'count');
		const currentCountNum = parseInt(currentCount || '0');

		if (currentCountNum >= MAX_HIGH_FIVES) {
			return json(
				{
					error: 'Rate limit exceeded',
					message: `Maximum ${MAX_HIGH_FIVES} high fives per ${RATE_LIMIT_WINDOW} seconds`,
					remaining: 0,
					resetTime: RATE_LIMIT_WINDOW
				},
				{ status: 429 }
			);
		}

		const newRateLimitCount = currentCountNum + 1;
		await hSet(rateLimitKey, 'count', newRateLimitCount.toString());

		if (currentCountNum === 0) {
			await expire(rateLimitKey, RATE_LIMIT_WINDOW);
		}

		const newCount = await increment(HIGH_FIVE_KEY, 1);

		return json({
			count: newCount,
			remaining: MAX_HIGH_FIVES - newRateLimitCount,
			resetTime: RATE_LIMIT_WINDOW
		});
	} catch (error) {
		console.error('Error incrementing high five count:', error);
		return json({ error: 'Failed to increment counter' }, { status: 500 });
	}
};
