import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { getAnalytics, trackVisitor } from '~/lib/server/analytics.server';
import { consumeIpRateLimit } from '~/lib/server/rateLimit.server';

export const trackVisitAndGetAnalytics = createServerFn({ method: 'POST' }).handler(async () => {
	try {
		const rateLimit = await consumeIpRateLimit({
			scope: 'analytics',
			maxRequests: 30,
			windowSeconds: 60 * 60
		});
		if (!rateLimit.isLimited) await trackVisitor(getRequestHeader('user-agent') ?? '');
		return await getAnalytics();
	} catch (error) {
		console.error('analytics: Redis is unavailable, showing zero counts', error);
		return { totalViews: 0, badActors: 0 };
	}
});

export type Analytics = Awaited<ReturnType<typeof trackVisitAndGetAnalytics>>;
