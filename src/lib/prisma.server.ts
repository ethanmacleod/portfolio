import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const prisma = new PrismaClient({
	datasourceUrl: env.DATABASE_URL
});

export default prisma;
