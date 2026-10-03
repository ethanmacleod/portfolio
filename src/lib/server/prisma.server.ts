import { PrismaClient } from '@prisma/client';

const clientFromPreviousReload: unknown = import.meta.hot?.data.prisma;

export const prisma =
	clientFromPreviousReload instanceof PrismaClient ? clientFromPreviousReload : new PrismaClient();

if (import.meta.hot) import.meta.hot.data.prisma = prisma;
