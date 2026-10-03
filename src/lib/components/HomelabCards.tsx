import type { ReactNode } from 'react';
import type { Drive, NetworkDevice, Node, NodeStatus, PanelVariant, Stack } from '~/lib/types';
import { cn } from '~/lib/utils';

const panelTitleBarClassNames: Record<PanelVariant, string> = {
	blue: 'title-bar-navy',
	green: 'title-bar-forest'
};

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

function NodeStatusDot({ status }: { status: NodeStatus }) {
	return <span className={cn('h-2 w-2 shrink-0 rounded-full', nodeStatusDotClassNames[status])} />;
}

type WindowPanelProps = {
	title: string;
	variant: PanelVariant;
	titleAside?: ReactNode;
	children: ReactNode;
};

export function WindowPanel({ title, variant, titleAside, children }: WindowPanelProps) {
	return (
		<div className="bevel-button bg-win-button">
			<div className={cn('flex items-center gap-1.5 px-2 py-1', panelTitleBarClassNames[variant])}>
				<p className="flex-1 truncate font-mono text-xs font-bold text-white">{title}</p>
				{titleAside}
			</div>
			{children}
		</div>
	);
}

export function NodeRow({ node, unit }: { node: Node; unit: number }) {
	return (
		<div className="bevel-inset flex items-center gap-3 bg-white px-3 py-2">
			<div className="flex w-44 shrink-0 items-center gap-2">
				<NodeStatusDot status={node.status} />
				<div>
					<p className="font-mono text-xs font-bold text-win-navy">{node.model}</p>
					<p className="font-mono text-2xs text-gray-500">{node.role}</p>
				</div>
			</div>
			<div className="h-8 w-px shrink-0 bg-gray-300" />
			<div className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1">
				<NodeSpecs node={node} valueClassName="text-xs" />
			</div>
			<span className="shrink-0 font-mono text-2xs text-gray-400">U{unit}</span>
		</div>
	);
}

export function NodeCard({ node }: { node: Node }) {
	return (
		<div className="bevel-inset bg-white px-3 py-2">
			<div className="mb-2 flex items-center gap-2">
				<NodeStatusDot status={node.status} />
				<p className="font-mono text-xs font-bold text-win-forest">{node.model}</p>
			</div>
			<p className="mb-2 font-mono text-2xs text-gray-500">{node.role}</p>
			<div className="grid grid-cols-2 gap-x-3 gap-y-1">
				<NodeSpecs node={node} valueClassName="text-2xs" />
			</div>
		</div>
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
			<p className="font-mono text-2xs text-gray-500">{spec.label}</p>
			<p className={cn('font-mono text-gray-700', valueClassName)}>{spec.value}</p>
		</div>
	));
}

export function NetworkRow({ device }: { device: NetworkDevice }) {
	return (
		<div className="bevel-inset flex items-center gap-2 bg-white px-3 py-2">
			<span className="h-2 w-2 shrink-0 rounded-full bg-win-navy" />
			<div className="flex flex-1 items-baseline gap-3">
				<p className="w-36 shrink-0 font-mono text-2xs font-bold text-win-navy">{device.name}</p>
				<p className="font-mono text-xs text-gray-700">{device.model}</p>
				{device.notes && <p className="ml-auto font-mono text-2xs text-gray-500">{device.notes}</p>}
			</div>
		</div>
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
			<div className="bevel-inset h-4 flex-1 overflow-hidden bg-win-track">
				<div className={cn('h-full w-full', barClassName)} />
			</div>
			<span className="w-32 font-mono text-2xs text-gray-700">
				{drive.size} {drive.type}
			</span>
		</div>
	);
}

export function StackCard({ stack, variant }: { stack: Stack; variant: PanelVariant }) {
	return (
		<WindowPanel
			title={stack.name}
			variant={variant}
			titleAside={
				<span
					className={cn(
						'shrink-0 px-1 py-px font-mono text-2xs leading-none font-bold text-white',
						stackStatusClassNames[stack.status]
					)}
				>
					{stackStatusLabels[stack.status]}
				</span>
			}
		>
			<div className="p-2">
				{stack.services.length > 0 ? (
					<div className="flex flex-wrap gap-1">
						{stack.services.map((service) => (
							<span
								key={service}
								className={cn(
									'bevel-button bg-white px-2 py-1 font-mono text-2xs leading-none font-bold',
									stackServiceClassNames[variant]
								)}
							>
								{service}
							</span>
						))}
					</div>
				) : (
					<p className="font-mono text-2xs text-gray-500 italic">standby - no services</p>
				)}
			</div>
		</WindowPanel>
	);
}
