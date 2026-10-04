import { createClient } from 'redis';

const maxReconnectAttempts = 2;

function createRedisClient() {
	return createClient({
		url: process.env.REDIS_URL,
		disableOfflineQueue: true,
		socket: {
			connectTimeout: 2000,
			reconnectStrategy: (attempt, cause) => (attempt >= maxReconnectAttempts ? cause : 250)
		}
	});
}

type RedisClient = ReturnType<typeof createRedisClient>;

let redisClientPromise: Promise<RedisClient> | null = null;

async function connectRedisClient() {
	const client = createRedisClient();

	client.on('error', (error: unknown) => {
		console.error('redis: client error', error);
	});
	client.on('end', () => {
		redisClientPromise = null;
	});

	await client.connect();
	console.log('redis: client connected');
	return client;
}

export function getRedisClient(): Promise<RedisClient> {
	redisClientPromise ??= connectRedisClient().catch((error: unknown) => {
		redisClientPromise = null;
		throw error;
	});
	return redisClientPromise;
}

export async function increment(key: string): Promise<number> {
	const client = await getRedisClient();
	return await client.incr(key);
}

export async function getCount(key: string): Promise<number> {
	const client = await getRedisClient();
	return Number(await client.get(key));
}
