import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

let redisClient: RedisClient | null = null;

export async function getRedisClient(): Promise<RedisClient> {
	if (!redisClient) {
		redisClient = createClient({ url: process.env.REDIS_URL });

		redisClient.on('error', (error: unknown) => {
			console.error('redis: client error', error);
		});

		await redisClient.connect();
		console.log('redis: client connected');
	}
	return redisClient;
}

export async function increment(key: string): Promise<number> {
	const client = await getRedisClient();
	return await client.incr(key);
}

export async function getCount(key: string): Promise<number> {
	const client = await getRedisClient();
	return Number(await client.get(key));
}
