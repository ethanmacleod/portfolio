import { getRequestIP } from '@tanstack/react-start/server';
import { getRedisClient } from './redis.server';

type RateLimit = {
	scope: string;
	maxRequests: number;
	windowSeconds: number;
};

export async function consumeIpRateLimit({ scope, maxRequests, windowSeconds }: RateLimit) {
	const clientIp = getRequestIP({ xForwardedFor: true }) ?? 'unknown';
	const key = `ratelimit:${scope}:${clientIp}`;
	const client = await getRedisClient();

	const requestCount = await client.incr(key);
	await client.expire(key, windowSeconds, 'NX');

	return { isLimited: requestCount > maxRequests };
}
