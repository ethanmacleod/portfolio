import { createFileRoute } from '@tanstack/react-router';
import { groupBy, sumBy } from 'lodash-es';
import { DriveRow, NetworkRow, NodeCard, NodeRow, StackCard } from '~/lib/components/HomelabCards';
import { StatusDot } from '~/lib/components/ui/Badge';
import { Text } from '~/lib/components/ui/Text';
import { PageHeader, TitledPanel, Window } from '~/lib/components/ui/Window';
import {
	extraDrives,
	nasDrives,
	nasModel,
	nasNotes,
	networking,
	optiplexNodes,
	piNodes,
	stackCategories,
	stackCategoryVariants,
	stacks
} from '~/lib/config/homelab';
import { pageMeta } from '~/lib/site';

const totalRamGb = sumBy([...optiplexNodes, ...piNodes], (node) => node.ramGb);
const runningStackCount = stacks.filter((stack) => stack.status === 'online').length;
const stacksByCategory = groupBy(stacks, (stack) => stack.category);

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
		<div className="h-full overflow-auto">
			<div className="flex flex-col gap-3">
				<PageHeader
					title="HOMELAB.SH"
					description={
						<>
							{optiplexNodes.length} node Docker Swarm &nbsp;·&nbsp; {totalRamGb}GB total RAM
							&nbsp;·&nbsp; {runningStackCount} stacks running
						</>
					}
					aside={
						<div className="flex items-center gap-1.5">
							<StatusDot isBlinking className="bg-green-500" />
							<span className="font-mono text-xs font-bold text-green-700">CLUSTER ONLINE</span>
						</div>
					}
				/>

				<div className="flex flex-col gap-3 md:flex-row">
					<Window className="flex-1 p-3">
						<Text variant="sectionLabel" className="mb-3">
							[ OPTIPLEX CLUSTER - {optiplexNodes.length} NODES ]
						</Text>
						<div className="flex flex-col gap-1.5">
							{optiplexNodes.map((node, index) => (
								<NodeRow key={index} node={node} unit={index + 1} />
							))}
						</div>
					</Window>

					<Window className="shrink-0 p-3 md:w-72">
						<Text variant="sectionLabel" className="mb-3">
							[ RASPBERRY PI - {piNodes.length} NODES ]
						</Text>
						<div className="flex flex-col gap-1.5">
							{piNodes.map((node) => (
								<NodeCard key={node.model} node={node} />
							))}
						</div>
					</Window>
				</div>

				<div className="flex flex-col gap-3 md:flex-row">
					<Window className="flex-1 p-3">
						<Text variant="sectionLabel" className="mb-3">
							[ NETWORKING & INFRASTRUCTURE ]
						</Text>
						<div className="flex flex-col gap-1.5">
							{networking.map((device) => (
								<NetworkRow key={device.name} device={device} />
							))}
						</div>
					</Window>

					<Window className="shrink-0 p-3 md:w-64">
						<Text variant="sectionLabel" className="mb-3">
							[ STORAGE ]
						</Text>
						<div className="flex flex-col gap-2">
							<TitledPanel title={nasModel} variant="green">
								<div className="flex flex-col gap-2 p-3">
									{nasDrives.map((drive) => (
										<DriveRow
											key={drive.label}
											drive={drive}
											labelClassName="w-10"
											barClassName="bg-win-navy"
										/>
									))}
									<Text variant="meta" className="border-t border-gray-400 pt-2">
										{nasNotes}
									</Text>
								</div>
							</TitledPanel>
							<TitledPanel title="ADDITIONAL DRIVES" variant="blue">
								<div className="flex flex-col gap-2 p-3">
									{extraDrives.map((drive) => (
										<DriveRow
											key={drive.label}
											drive={drive}
											labelClassName="w-4"
											barClassName="bg-win-forest"
										/>
									))}
								</div>
							</TitledPanel>
						</div>
					</Window>
				</div>

				<Window className="p-3">
					<Text variant="sectionLabel" className="mb-3">
						[ HOSTED STACKS - {stacks.length} TOTAL ]
					</Text>
					<div className="flex flex-col gap-4">
						{stackCategories.map((category) => (
							<div key={category}>
								<p className="mb-1.5 font-mono text-2xs font-bold tracking-widest text-blue-700 uppercase">
									{category}
								</p>
								<div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
									{(stacksByCategory[category] ?? []).map((stack) => (
										<StackCard
											key={stack.name}
											stack={stack}
											variant={stackCategoryVariants[category]}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</Window>
			</div>
		</div>
	);
}
