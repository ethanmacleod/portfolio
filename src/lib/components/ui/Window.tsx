import type { ReactNode } from 'react';
import { Text } from '~/lib/components/ui/Text';
import type { PanelVariant } from '~/lib/types';
import { cn } from '~/lib/utils';

type WindowProps = {
	className?: string;
	children: ReactNode;
};

export function Window({ className, children }: WindowProps) {
	return (
		<div
			className={cn(
				'bevel-inset flex w-full flex-col overflow-hidden bg-win-surface font-window text-window leading-tight text-black',
				className
			)}
		>
			{children}
		</div>
	);
}

type PageHeaderProps = {
	title: string;
	description: ReactNode;
	aside?: ReactNode;
};

export function PageHeader({ title, description, aside }: PageHeaderProps) {
	return (
		<Window className="shrink-0 p-3">
			<div className="flex items-center justify-between gap-3">
				<div>
					<Text variant="pageTitle">{`// ${title}`}</Text>
					<Text variant="description" className="mt-1">
						{description}
					</Text>
				</div>
				{aside}
			</div>
		</Window>
	);
}

const titleBarClassNames: Record<PanelVariant, string> = {
	blue: 'title-bar-navy',
	green: 'title-bar-forest'
};

type TitledPanelProps = {
	title: string;
	variant: PanelVariant;
	titleAside?: ReactNode;
	children: ReactNode;
};

export function TitledPanel({ title, variant, titleAside, children }: TitledPanelProps) {
	return (
		<div className="bevel-button bg-win-button">
			<div className={cn('flex items-center gap-1.5 px-2 py-1', titleBarClassNames[variant])}>
				<p className="flex-1 truncate font-mono text-xs font-bold text-white">{title}</p>
				{titleAside}
			</div>
			{children}
		</div>
	);
}

type SectionWindowProps = {
	label: ReactNode;
	grows?: boolean;
	children: ReactNode;
};

export function SectionWindow({ label, grows = false, children }: SectionWindowProps) {
	return (
		<Window className={cn('p-3', grows ? 'flex-1' : 'shrink-0')}>
			<Text variant="sectionLabel" className="mb-3">
				[ {label} ]
			</Text>
			{children}
		</Window>
	);
}
