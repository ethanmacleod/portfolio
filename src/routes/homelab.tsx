import { createFileRoute } from '@tanstack/react-router';
import { sumBy } from 'lodash-es';
import {
	ClusterSection,
	ClusterStatus,
	HostedStacksSection,
	NetworkSection,
	PiSection,
	StorageSection
} from '~/lib/components/HomelabCards';
import { PageStack, SplitLayout } from '~/lib/components/ui/Layout';
import { PageHeader } from '~/lib/components/ui/Window';
import { optiplexNodes, piNodes, stacks } from '~/lib/config/homelab';
import { pageMeta } from '~/lib/site';

const totalRamGb = sumBy([...optiplexNodes, ...piNodes], (node) => node.ramGb);
const runningStackCount = stacks.filter((stack) => stack.status === 'online').length;

export const Route = createFileRoute('/homelab')({
	staticData: {
		heading: {
			title: 'My Homelab',
			subtitle: 'About $20/month of maintenance that sits in my livingroom'
		},
		sitemap: { priority: 0.7, changefreq: 'monthly' }
	},
	head: () => ({
		meta: pageMeta(
			'Homelab - Ethan MacLeod',
			'My homelab setup - Docker Swarm cluster, networking, and self-hosted stacks'
		)
	}),
	component: HomelabPage
});

function HomelabPage() {
	return (
		<PageStack>
			<PageHeader
				title="HOMELAB.SH"
				description={`${optiplexNodes.length} node Docker Swarm \u00a0·\u00a0 ${totalRamGb}GB total RAM \u00a0·\u00a0 ${runningStackCount} stacks running`}
				aside={<ClusterStatus />}
			/>
			<SplitLayout asideWidth="wide" aside={<PiSection />}>
				<ClusterSection />
			</SplitLayout>
			<SplitLayout asideWidth="narrow" aside={<StorageSection />}>
				<NetworkSection />
			</SplitLayout>
			<HostedStacksSection />
		</PageStack>
	);
}
