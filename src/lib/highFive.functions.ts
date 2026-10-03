import { createServerFn } from '@tanstack/react-start';
import { consumeIpRateLimit } from '~/lib/server/rateLimit.server';
import { getCount, increment } from '~/lib/server/redis.server';

const highFiveCountKey = 'highfives:count';

export const getHighFiveCount = createServerFn().handler(async () => {
	try {
		return await getCount(highFiveCountKey);
	} catch (error) {
		console.error('highfive: Redis is unavailable, showing a zero count', error);
		return 0;
	}
});

export const giveHighFive = createServerFn({ method: 'POST' }).handler(async () => {
	const rateLimit = await consumeIpRateLimit({
		scope: 'highfive',
		maxRequests: 5,
		windowSeconds: 30
	});
	if (rateLimit.isLimited) return { result: 'rateLimited' } as const;

	const count = await increment(highFiveCountKey);
	return { result: 'counted', count } as const;
});
