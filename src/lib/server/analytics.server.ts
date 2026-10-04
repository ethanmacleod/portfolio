import { isbot } from 'isbot';
import { getCount, increment } from './redis.server';

const totalViewsKey = 'analytics:total_views';
const badActorsKey = 'analytics:bad_actors';

export async function trackVisitor(userAgent: string) {
	await increment(isbot(userAgent) ? badActorsKey : totalViewsKey);
}

export async function getAnalytics() {
	const [totalViews, badActors] = await Promise.all([
		getCount(totalViewsKey),
		getCount(badActorsKey)
	]);
	return { totalViews, badActors };
}
