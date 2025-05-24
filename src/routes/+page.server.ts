// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const { results } = await platform.env.DB.prepare('SELECT * FROM news').all();
	return {
		news: results
	};
};
