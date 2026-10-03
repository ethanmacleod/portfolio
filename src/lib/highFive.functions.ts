import { createServerFn } from '@tanstack/react-start';
import { consumeIpRateLimit } from '~/lib/server/rateLimit.server';
import { getCount, increment } from '~/lib/server/redis.server';

const highFiveCountKey = 'highfives:count';

export const getHighFiveCount = createServerFn().handler(async () => {
	return await getCount(highFiveCountKey);
});

export const giveHighFive = createServerFn({ method: 'POST' }).handler(async () => {
	const rateLimit = await consumeIpRateLimit({
		scope: 'highfive',
		maxRequests: 5,
		windowSeconds: 30
	});
	if (rateLimit.isLimited) return { result: 'rateLimited' } as const;

	const count = await increment(highFiveCountKey);
	return { result: 'counted', count, remaining: rateLimit.remaining } as const;
});
