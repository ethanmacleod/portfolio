import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { Guestbook, type GuestbookLoadState } from '~/lib/components/Guestbook';
import { ProfileCard } from '~/lib/components/ProfileCard';
import { SkillsGrid } from '~/lib/components/SkillBlock';
import { PageStack } from '~/lib/components/ui/Layout';
import { getGuestbookPage } from '~/lib/guestbook.functions';
import { pageMeta } from '~/lib/site';

const homeSearchSchema = z.object({
	page: z.number().int().min(1).optional().catch(undefined)
});

export const Route = createFileRoute('/')({
	staticData: {
		heading: {
			title: 'Welcome to My Website!',
			subtitle: 'Get to know a little bit about me and sign my guestbook :)'
		},
		sitemap: { priority: 1.0, changefreq: 'weekly' }
	},
	head: () => ({
		meta: pageMeta(
			'Ethan MacLeod - Software Developer',
			'NZ-based software developer. Personal portfolio showcasing projects, homelab, and more.'
		)
	}),
	validateSearch: homeSearchSchema,
	loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
	loader: async ({ deps: { page } }): Promise<GuestbookLoadState> => {
		const guestbookPage = await loadGuestbookPage(page);
		if (!guestbookPage) return { status: 'failed' };

		const lastPage = Math.max(1, guestbookPage.totalPages);
		if (page > lastPage) throw redirect({ to: '/', search: { page: lastPage } });

		return { status: 'loaded', guestbookPage };
	},
	component: HomePage
});

async function loadGuestbookPage(page: number) {
	try {
		return await getGuestbookPage({ data: { page } });
	} catch (error) {
		console.error('guestbook: failed to load entries', error);
		return null;
	}
}

function HomePage() {
	const guestbook = Route.useLoaderData();

	return (
		<PageStack gap="loose">
			<ProfileCard />
			<SkillsGrid />
			<Guestbook guestbook={guestbook} />
		</PageStack>
	);
}
