import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Guestbook, type GuestbookLoadState } from '~/lib/components/Guestbook';
import { ProfileCard } from '~/lib/components/ProfileCard';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { SkillBlock } from '~/lib/components/SkillBlock';
import { skills } from '~/lib/config/skills';
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
		try {
			return { status: 'loaded', page: await getGuestbookPage({ data: { page } }) };
		} catch (error) {
			console.error('guestbook: failed to load entries', error);
			return { status: 'failed' };
		}
	},
	component: HomePage
});

function HomePage() {
	const guestbook = Route.useLoaderData();

	return (
		<div className="space-y-6">
			<ProfileCard />
			<RetroDiv className="mb-6">
				<div className="bevel-inset bg-gray-50 p-1">
					<div className="flex flex-wrap justify-center gap-1">
						{skills.map((skill, index) => (
							<SkillBlock key={skill.name} {...skill} index={index} />
						))}
					</div>
				</div>
			</RetroDiv>
			<Guestbook guestbook={guestbook} />
		</div>
	);
}
