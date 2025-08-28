import { trackVisitor, getAnalytics } from '$lib/server/analytics';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const userAgent = request.headers.get('user-agent') ?? '';
	
	// Track the visitor
	await trackVisitor(userAgent);
	
	// Get current analytics
	const analytics = await getAnalytics();
	
	return {
		analytics
	};
};