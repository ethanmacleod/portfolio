import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { getAnalytics, trackVisitor } from '~/lib/server/analytics.server';

export const trackVisitAndGetAnalytics = createServerFn({ method: 'POST' }).handler(async () => {
	try {
		await trackVisitor(getRequestHeader('user-agent') ?? '');
		return await getAnalytics();
	} catch (error) {
		console.error('analytics: Redis is unavailable, showing zero counts', error);
		return { totalViews: 0, badActors: 0 };
	}
});

export type Analytics = Awaited<ReturnType<typeof trackVisitAndGetAnalytics>>;
