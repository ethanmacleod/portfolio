import { createFileRoute } from '@tanstack/react-router';
import { Monitor } from 'lucide-react';
import { UsesCard } from '~/lib/components/UsesCard';
import { CardGrid, PageStack, ScrollArea } from '~/lib/components/ui/Layout';
import { TitleBarHeader } from '~/lib/components/ui/Window';
import { sections } from '~/lib/config/uses';
import { pageMeta } from '~/lib/site';
import { plural } from '~/lib/utils';

export const Route = createFileRoute('/uses')({
	staticData: {
		heading: {
			title: 'My Stack & Setup',
			subtitle: 'Just some misc stats about me :)'
		},
		sitemap: { priority: 0.7, changefreq: 'monthly' }
	},
	head: () => ({
		meta: pageMeta('Setup - Ethan MacLeod', 'The hardware and software I use day to day')
	}),
	component: UsesPage
});

function UsesPage() {
	return (
		<PageStack fillsHeight>
			<TitleBarHeader
				title="Setup"
				Icon={Monitor}
				statusFields={[
					plural('section', sections.length),
					'The computers, peripherals and tools I use day to day'
				]}
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
