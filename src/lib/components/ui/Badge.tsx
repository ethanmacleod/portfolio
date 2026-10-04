import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

const pillShapes = {
	bevel: 'bevel-button px-2 py-1 text-2xs',
	tag: 'px-1 py-px text-2xs',
	rounded: 'rounded px-2 py-0.5 text-xs leading-normal'
} as const;

type PillProps = {
	shape: keyof typeof pillShapes;
	className?: string;
	children: ReactNode;
};

export function Pill({ shape, className, children }: PillProps) {
	return (
		<span className={cn('shrink-0 font-mono leading-none font-bold', pillShapes[shape], className)}>
			{children}
		</span>
	);
}
