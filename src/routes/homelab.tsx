import { createFileRoute } from '@tanstack/react-router';
import { Server } from 'lucide-react';
import { sumBy } from 'lodash-es';
import {
	HostedStacksSection,
	NetworkSection,
	NodesSection,
	StorageSection
} from '~/lib/components/HomelabCards';
import { PageStack, SplitLayout } from '~/lib/components/ui/Layout';
import { TitleBarHeader } from '~/lib/components/ui/Window';
import { optiplexNodes, piNodes, stacks } from '~/lib/config/homelab';
import { pageMeta } from '~/lib/site';
import { plural } from '~/lib/utils';

const totalRamGb = sumBy([...optiplexNodes, ...piNodes], (node) => node.ramGb);

export const Route = createFileRoute('/homelab')({
	staticData: {
		heading: {
			title: 'My Homelab',
			subtitle: 'About $20/month of maintenance that sits in my living room'
		},
		sitemap: { priority: 0.7, changefreq: 'monthly' }
	},
	head: () => ({
		meta: pageMeta(
			'Homelab - Ethan MacLeod',
			'The k3s cluster, network and self-hosted apps running in my living room'
		)
	}),
	component: HomelabPage
});

function HomelabPage() {
	return (
		<PageStack>
			<TitleBarHeader
				title="Homelab"
				Icon={Server}
				statusFields={[
					`${plural('node', optiplexNodes.length)} running k3s`,
					`${totalRamGb}GB RAM`,
					plural('stack', stacks.length)
				]}
			/>
			<NodesSection />
			<SplitLayout aside={<StorageSection />}>
				<NetworkSection />
			</SplitLayout>
			<HostedStacksSection />
		</PageStack>
	);
}
