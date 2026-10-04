import { groupBy } from 'lodash-es';
import { Pill } from '~/lib/components/ui/Badge';
import { Inset } from '~/lib/components/ui/Bevel';
import { DetailsTable } from '~/lib/components/ui/DetailsTable';
import { Text } from '~/lib/components/ui/Text';
import { SectionWindow, TitledPanel } from '~/lib/components/ui/Window';
import {
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
import type { Drive, NetworkDevice, Node, PanelVariant, Stack } from '~/lib/types';
import { cn } from '~/lib/utils';

const allNodes = [...optiplexNodes, ...piNodes];

const stackServiceClassNames: Record<PanelVariant, string> = {
	blue: 'text-win-navy',
	green: 'text-win-forest-dark'
};

const nodeColumns: { label: string; value: (node: Node) => string }[] = [
	{ label: 'Name', value: (node) => node.model },
	{ label: 'Role', value: (node) => node.role },
	{ label: 'CPU', value: (node) => node.cpu },
	{ label: 'RAM', value: (node) => `${node.ramGb}GB ${node.ramType}` },
	{ label: 'Storage', value: (node) => node.storage },
	{ label: 'OS', value: (node) => node.os }
];

const networkColumns: { label: string; value: (device: NetworkDevice) => string }[] = [
	{ label: 'Device', value: (device) => device.name },
	{ label: 'Model', value: (device) => device.model },
	{ label: 'Notes', value: (device) => device.notes }
];

function DriveRow({ drive }: { drive: Drive }) {
	return (
		<div className="flex items-center gap-2">
			<span className={'w-10 font-mono text-2xs text-gray-600'}>{drive.label}</span>
			<Inset tone="track" className="h-4 flex-1 overflow-hidden">
				<div className={'h-full w-full bg-win-navy'} />
			</Inset>
			<span className="w-32 font-mono text-2xs text-gray-700">
				{drive.size} {drive.type}
			</span>
		</div>
	);
}

function StackCard({ stack, variant }: { stack: Stack; variant: PanelVariant }) {
	return (
		<TitledPanel title={stack.name} variant={variant}>
			<div className="flex flex-wrap gap-1 p-2">
				{stack.services.map((service) => (
					<Pill
						key={service}
						shape="bevel"
						className={cn('bg-white', stackServiceClassNames[variant])}
					>
						{service}
					</Pill>
				))}
			</div>
		</TitledPanel>
	);
}

export function NodesSection() {
	return (
		<SectionWindow label="Nodes">
			<DetailsTable columns={nodeColumns} rows={allNodes} />
		</SectionWindow>
	);
}

export function NetworkSection() {
	return (
		<SectionWindow label="Networking" grows>
			<DetailsTable columns={networkColumns} rows={networking} />
		</SectionWindow>
	);
}

export function StorageSection() {
	return (
		<SectionWindow label="Storage" grows>
			<TitledPanel title={nasModel} variant="green" grows>
				<div className="flex flex-col gap-2 p-3">
					{nasDrives.map((drive) => (
						<DriveRow key={drive.label} drive={drive} />
					))}
					<Text variant="meta" className="border-t border-gray-400 pt-2">
						{nasNotes}
					</Text>
				</div>
			</TitledPanel>
		</SectionWindow>
	);
}

const stacksByCategory = groupBy(stacks, (stack) => stack.category);

export function HostedStacksSection() {
	return (
		<SectionWindow label={`Hosted stacks (${stacks.length})`}>
			<div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{stackCategories.map((category) => (
					<div key={category} className="flex flex-col gap-1.5">
						<Text variant="cardTitle" as="h3" className="uppercase">
							{category}
						</Text>
						{(stacksByCategory[category] ?? []).map((stack) => (
							<StackCard key={stack.name} stack={stack} variant={stackCategoryVariants[category]} />
						))}
					</div>
				))}
			</div>
		</SectionWindow>
	);
}
