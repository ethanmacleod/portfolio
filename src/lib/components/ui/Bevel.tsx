import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

const bevelTones = {
	none: '',
	white: 'bg-white',
	paper: 'bg-gray-50',
	light: 'bg-gray-200',
	surface: 'bg-win-surface',
	face: 'bg-win-face',
	button: 'bg-win-button',
	track: 'bg-win-track',
	screen: 'bg-black',
	success: 'bg-green-50',
	danger: 'bg-red-50',
	note: 'bg-yellow-50'
} as const;

type BevelTone = keyof typeof bevelTones;

export function insetClassName(tone: BevelTone, className?: string) {
	return cn('bevel-inset', bevelTones[tone], className);
}

export function raisedClassName(tone: BevelTone, className?: string) {
	return cn('bevel-button', bevelTones[tone], className);
}

type BevelProps = {
	tone: BevelTone;
	className?: string;
	role?: 'alert';
	children?: ReactNode;
};

export function Inset({ tone, className, role, children }: BevelProps) {
	return (
		<div role={role} className={insetClassName(tone, className)}>
			{children}
		</div>
	);
}

export function Raised({ tone, className, role, children }: BevelProps) {
	return (
		<div role={role} className={raisedClassName(tone, className)}>
			{children}
		</div>
	);
}
