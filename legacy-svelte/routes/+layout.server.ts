import { trackVisitor, getAnalytics } from '$lib/server/analytics';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const userAgent = request.headers.get('user-agent') ?? '';
	await trackVisitor(userAgent);
	const analytics = await getAnalytics();

	return {
		analytics
	};
};
