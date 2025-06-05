// src/routes/+page.server.ts
import prisma from '$lib/prisma.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const news = await prisma.news.findMany({
		orderBy: { created_at: 'asc' },
		include: { tags: true }
	});

	return {
		news
	} satisfies PageServerLoad;
};
