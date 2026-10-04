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

const asideWidths = {
	narrow: 'md:w-64',
	wide: 'md:w-72'
} as const;

type SplitLayoutProps = {
	aside: ReactNode;
	asideWidth: keyof typeof asideWidths;
	fillsHeight?: boolean;
	children: ReactNode;
};

export function SplitLayout({
	aside,
	asideWidth,
	fillsHeight = false,
	children
}: SplitLayoutProps) {
	return (
		<div className={cn('flex flex-col gap-3 md:flex-row', fillsHeight && 'h-full min-h-0')}>
			<div className="flex min-w-0 flex-1 flex-col gap-3">{children}</div>
			<div className={cn('flex w-full shrink-0 flex-col gap-3', asideWidths[asideWidth])}>
				{aside}
			</div>
		</div>
	);
}

const gridGaps = {
	tight: 'gap-1.5',
	normal: 'gap-3'
} as const;

type CardGridProps = {
	gap?: keyof typeof gridGaps;
	children: ReactNode;
};

export function CardGrid({ gap = 'normal', children }: CardGridProps) {
	return (
		<div className={cn('grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3', gridGaps[gap])}>
			{children}
		</div>
	);
}
