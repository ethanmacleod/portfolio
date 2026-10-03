import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '~/generated/prisma/client';

function createPrismaClient() {
	const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
	return new PrismaClient({ adapter });
}

const clientFromPreviousReload: unknown = import.meta.hot?.data.prisma;

export const prisma =
	clientFromPreviousReload instanceof PrismaClient
		? clientFromPreviousReload
		: createPrismaClient();

if (import.meta.hot) import.meta.hot.data.prisma = prisma;
