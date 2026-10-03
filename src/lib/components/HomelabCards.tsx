import { Pill, StatusDot } from '~/lib/components/ui/Badge';
import { Inset } from '~/lib/components/ui/Bevel';
import { Text } from '~/lib/components/ui/Text';
import { TitledPanel } from '~/lib/components/ui/Window';
import type { Drive, NetworkDevice, Node, NodeStatus, PanelVariant, Stack } from '~/lib/types';
import { cn } from '~/lib/utils';

const nodeStatusDotClassNames: Record<NodeStatus, string> = {
	online: 'bg-green-500',
	offline: 'bg-red-500',
	standby: 'bg-yellow-400'
};

const stackStatusLabels: Record<NodeStatus, string> = {
	online: 'ON',
	offline: 'OFF',
	standby: 'SBY'
};

const stackStatusClassNames: Record<NodeStatus, string> = {
	online: 'bg-status-online',
	offline: 'bg-status-offline',
	standby: 'bg-status-standby'
};

const stackServiceClassNames: Record<PanelVariant, string> = {
	blue: 'text-win-navy',
	green: 'text-win-forest-dark'
};

export function NodeRow({ node, unit }: { node: Node; unit: number }) {
	return (
		<Inset tone="white" className="flex items-center gap-3 px-3 py-2">
			<div className="flex w-44 shrink-0 items-center gap-2">
				<StatusDot className={nodeStatusDotClassNames[node.status]} />
				<div>
					<p className="font-mono text-xs font-bold text-win-navy">{node.model}</p>
					<Text variant="meta">{node.role}</Text>
				</div>
			</div>
			<div className="h-8 w-px shrink-0 bg-gray-300" />
			<div className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1">
				<NodeSpecs node={node} valueClassName="text-xs" />
			</div>
			<span className="shrink-0 font-mono text-2xs text-gray-400">U{unit}</span>
		</Inset>
	);
}

export function NodeCard({ node }: { node: Node }) {
	return (
		<Inset tone="white" className="px-3 py-2">
			<div className="mb-2 flex items-center gap-2">
				<StatusDot className={nodeStatusDotClassNames[node.status]} />
				<p className="font-mono text-xs font-bold text-win-forest">{node.model}</p>
			</div>
			<Text variant="meta" className="mb-2">
				{node.role}
			</Text>
			<div className="grid grid-cols-2 gap-x-3 gap-y-1">
				<NodeSpecs node={node} valueClassName="text-2xs" />
			</div>
		</Inset>
	);
}

function NodeSpecs({ node, valueClassName }: { node: Node; valueClassName: string }) {
	const specs = [
		{ label: 'CPU', value: node.cpu },
		{ label: 'RAM', value: `${node.ramGb}GB ${node.ramType}` },
		{ label: 'STORAGE', value: node.storage },
		{ label: 'OS', value: node.os }
	];

	return specs.map((spec) => (
		<div key={spec.label}>
			<Text variant="meta">{spec.label}</Text>
			<p className={cn('font-mono text-gray-700', valueClassName)}>{spec.value}</p>
		</div>
	));
}

export function NetworkRow({ device }: { device: NetworkDevice }) {
	return (
		<Inset tone="white" className="flex items-center gap-2 px-3 py-2">
			<StatusDot className="bg-win-navy" />
			<div className="flex flex-1 items-baseline gap-3">
				<p className="w-36 shrink-0 font-mono text-2xs font-bold text-win-navy">{device.name}</p>
				<p className="font-mono text-xs text-gray-700">{device.model}</p>
				{device.notes && (
					<Text variant="meta" className="ml-auto">
						{device.notes}
					</Text>
				)}
			</div>
		</Inset>
	);
}

type DriveRowProps = {
	drive: Drive;
	labelClassName: string;
	barClassName: string;
};

export function DriveRow({ drive, labelClassName, barClassName }: DriveRowProps) {
	return (
		<div className="flex items-center gap-2">
			<span className={cn('font-mono text-2xs text-gray-600', labelClassName)}>{drive.label}</span>
			<Inset tone="track" className="h-4 flex-1 overflow-hidden">
				<div className={cn('h-full w-full', barClassName)} />
			</Inset>
			<span className="w-32 font-mono text-2xs text-gray-700">
				{drive.size} {drive.type}
			</span>
		</div>
	);
}

export function StackCard({ stack, variant }: { stack: Stack; variant: PanelVariant }) {
	return (
		<TitledPanel
			title={stack.name}
			variant={variant}
			titleAside={
				<Pill shape="tag" className={cn('text-white', stackStatusClassNames[stack.status])}>
					{stackStatusLabels[stack.status]}
				</Pill>
			}
		>
			<div className="p-2">
				{stack.services.length > 0 ? (
					<div className="flex flex-wrap gap-1">
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
				) : (
					<Text variant="meta" className="italic">
						standby - no services
					</Text>
				)}
			</div>
		</TitledPanel>
	);
}
