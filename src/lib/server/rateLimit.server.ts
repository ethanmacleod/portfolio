import { getRequestIP } from '@tanstack/react-start/server';
import { getRedisClient } from './redis.server';

type RateLimit = {
	scope: string;
	maxRequests: number;
	windowSeconds: number;
};

export function getClientIp() {
	return getRequestIP({ xForwardedFor: process.env.VERCEL === '1' });
}

export async function consumeIpRateLimit({ scope, maxRequests, windowSeconds }: RateLimit) {
	const clientIp = getClientIp() ?? 'unknown';
	const key = `ratelimit:${scope}:${clientIp}`;
	try {
		const client = await getRedisClient();
		const requestCount = await client.incr(key);
		await client.expire(key, windowSeconds, 'NX');
		return { isLimited: requestCount > maxRequests };
	} catch (error) {
		console.error(`ratelimit: Redis is unavailable, blocking the ${scope} request`, error);
		return { isLimited: true };
	}
}
