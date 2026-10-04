import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

const stackGaps = {
	tight: 'gap-2',
	normal: 'gap-3',
	loose: 'gap-6'
} as const;

type PageStackProps = {
	gap?: keyof typeof stackGaps;
	fillsHeight?: boolean;
	children: ReactNode;
};

export function PageStack({ gap = 'normal', fillsHeight = false, children }: PageStackProps) {
	return (
		<div className={cn('flex flex-col', stackGaps[gap], fillsHeight && 'h-full min-h-0')}>
			{children}
		</div>
	);
}

export function ScrollArea({ children }: { children: ReactNode }) {
	return <div className="min-h-0 flex-1 overflow-auto">{children}</div>;
}

type SplitLayoutProps = {
	aside: ReactNode;
	fillsHeight?: boolean;
	children: ReactNode;
};

export function SplitLayout({ aside, fillsHeight = false, children }: SplitLayoutProps) {
	return (
		<div className={cn('flex flex-col gap-3 md:flex-row', fillsHeight && 'h-full min-h-0')}>
			<div className="flex min-w-0 flex-1 flex-col gap-3">{children}</div>
			<div className="flex w-full shrink-0 flex-col gap-3 md:w-72">{aside}</div>
		</div>
	);
}

export function CardGrid({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-full auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			{children}
		</div>
	);
}
