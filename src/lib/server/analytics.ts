import { createClient } from 'redis';
import { isbot } from 'isbot';
import { REDIS_URL } from '$env/static/private';

const TOTAL_VIEWS_KEY = 'analytics:total_views';
const BAD_ACTORS_KEY = 'analytics:bad_actors';

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
	if (!redisClient) {
		redisClient = createClient({
			url: REDIS_URL
		});
		await redisClient.connect();
	}
	return redisClient;
}

export async function trackVisitor(userAgent: string) {
	const isBadActor = isbot(userAgent);
	const redis = await getRedisClient();
	
	if (isBadActor) {
		await redis.incr(BAD_ACTORS_KEY);
	} else {
		await redis.incr(TOTAL_VIEWS_KEY);
	}
}

export async function getAnalytics() {
	const redis = await getRedisClient();
	
	const [totalViews, badActors] = await Promise.all([
		redis.get(TOTAL_VIEWS_KEY),
		redis.get(BAD_ACTORS_KEY)
	]);

	return {
		totalViews: parseInt(totalViews || '0', 10),
		badActors: parseInt(badActors || '0', 10)
	};
}