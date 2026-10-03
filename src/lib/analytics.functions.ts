import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { getAnalytics, trackVisitor } from '~/lib/server/analytics.server';

export const trackVisitAndGetAnalytics = createServerFn().handler(async () => {
	await trackVisitor(getRequestHeader('user-agent') ?? '');
	return await getAnalytics();
});
