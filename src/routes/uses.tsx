import { createFileRoute } from '@tanstack/react-router';
import { UsesCard } from '~/lib/components/UsesCard';
import { CardGrid, PageStack, ScrollArea } from '~/lib/components/ui/Layout';
import { PageHeader } from '~/lib/components/ui/Window';
import { sections } from '~/lib/config/uses';
import { pageMeta } from '~/lib/site';

export const Route = createFileRoute('/uses')({
	staticData: {
		heading: {
			title: 'My Stack & Setup',
			subtitle: 'Just some misc stats about me :)'
		},
		sitemap: { priority: 0.7, changefreq: 'monthly' }
	},
	head: () => ({
		meta: pageMeta('Uses - Ethan MacLeod', 'What I use - hardware, software, and more')
	}),
	component: UsesPage
});

function UsesPage() {
	return (
		<PageStack fillsHeight>
			<PageHeader
				title="USES.TXT"
				description="Hardware, software, and everything I couldn't put on the other pages."
			/>
			<ScrollArea>
				<CardGrid>
					{sections.map((section) => (
						<UsesCard key={section.title} section={section} />
					))}
				</CardGrid>
			</ScrollArea>
		</PageStack>
	);
}
