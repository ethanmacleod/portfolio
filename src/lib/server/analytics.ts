import { isbot } from 'isbot';
import { increment, get } from './redis';

const TOTAL_VIEWS_KEY = 'analytics:total_views';
const BAD_ACTORS_KEY = 'analytics:bad_actors';

export async function trackVisitor(userAgent: string) {
	const isBadActor = isbot(userAgent);

	if (isBadActor) await increment(BAD_ACTORS_KEY);
	else await increment(TOTAL_VIEWS_KEY);
}

export async function getAnalytics() {
	const [totalViews, badActors] = await Promise.all([get(TOTAL_VIEWS_KEY), get(BAD_ACTORS_KEY)]);

	return {
		totalViews: parseInt(totalViews || '0', 10),
		badActors: parseInt(badActors || '0', 10)
	};
}
