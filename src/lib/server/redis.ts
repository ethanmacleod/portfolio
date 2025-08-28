import { createClient, type RedisClientType } from 'redis';
import { REDIS_URL } from '$env/static/private';

let redisClient: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
	if (!redisClient) {
		redisClient = createClient({
			url: REDIS_URL
		}) as RedisClientType;

		redisClient.on('error', (err) => {
			console.error('Redis Client Error:', err);
		});

		await redisClient.connect();
		console.log('Redis client connected');
	}
	return redisClient;
}

export async function closeRedisClient(): Promise<void> {
	if (redisClient) {
		await redisClient.quit();
		redisClient = null;
		console.log('Redis client disconnected');
	}
}

export async function increment(key: string, amount = 1): Promise<number> {
	const client = await getRedisClient();
	return await client.incrBy(key, amount);
}

export async function decrement(key: string, amount = 1): Promise<number> {
	const client = await getRedisClient();
	return await client.decrBy(key, amount);
}

export async function get(key: string): Promise<string | null> {
	const client = await getRedisClient();
	return await client.get(key);
}

export async function set(key: string, value: string, expireSeconds?: number): Promise<void> {
	const client = await getRedisClient();
	if (expireSeconds) {
		await client.setEx(key, expireSeconds, value);
	} else {
		await client.set(key, value);
	}
}

export async function del(key: string): Promise<number> {
	const client = await getRedisClient();
	return await client.del(key);
}

export async function exists(key: string): Promise<boolean> {
	const client = await getRedisClient();
	return (await client.exists(key)) === 1;
}

export async function expire(key: string, seconds: number): Promise<boolean> {
	const client = await getRedisClient();
	return (await client.expire(key, seconds)) === 1;
}

export async function keys(pattern: string): Promise<string[]> {
	const client = await getRedisClient();
	return await client.keys(pattern);
}

export async function hGet(key: string, field: string): Promise<string | null> {
	const client = await getRedisClient();
	return await client.hGet(key, field);
}

export async function hSet(key: string, field: string, value: string): Promise<number> {
	const client = await getRedisClient();
	return await client.hSet(key, field, value);
}

export async function hGetAll(key: string): Promise<Record<string, string>> {
	const client = await getRedisClient();
	return await client.hGetAll(key);
}

export async function lPush(key: string, ...values: string[]): Promise<number> {
	const client = await getRedisClient();
	return await client.lPush(key, values);
}

export async function rPush(key: string, ...values: string[]): Promise<number> {
	const client = await getRedisClient();
	return await client.rPush(key, values);
}

export async function lPop(key: string): Promise<string | null> {
	const client = await getRedisClient();
	return await client.lPop(key);
}

export async function rPop(key: string): Promise<string | null> {
	const client = await getRedisClient();
	return await client.rPop(key);
}

export async function lRange(key: string, start: number, stop: number): Promise<string[]> {
	const client = await getRedisClient();
	return await client.lRange(key, start, stop);
}
