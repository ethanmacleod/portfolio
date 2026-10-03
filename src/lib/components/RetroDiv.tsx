import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

type RetroDivProps = {
	className?: string;
	children: ReactNode;
};

export function RetroDiv({ className, children }: RetroDivProps) {
	return (
		<div
			className={cn(
				'bevel-inset flex w-full flex-col overflow-hidden bg-[#d4d4d4] font-[Verdana] text-[13px] leading-tight text-black',
				className
			)}
		>
			{children}
		</div>
	);
}
