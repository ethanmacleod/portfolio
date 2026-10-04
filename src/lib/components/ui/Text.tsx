import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

const textVariants = {
	pageTitle: { element: 'h1', className: 'font-mono text-base font-bold text-blue-700' },
	cardTitle: { element: 'h2', className: 'font-mono text-xs font-bold text-blue-700' },
	value: { element: 'p', className: 'font-mono text-xs text-gray-700' },
	sectionLabel: { element: 'h2', className: 'font-mono text-xs font-bold text-gray-600' },
	description: { element: 'p', className: 'font-mono text-xs text-gray-600' },
	meta: { element: 'p', className: 'font-mono text-2xs text-gray-500' },
	fieldLabel: { element: 'span', className: 'font-mono text-xs font-bold text-gray-700' }
} as const;

type TextVariant = keyof typeof textVariants;
type TextElement = 'h1' | 'h2' | 'h3' | 'p' | 'span';

type TextProps = {
	variant: TextVariant;
	as?: TextElement;
	className?: string;
	children: ReactNode;
};

export function Text({ variant, as, className, children }: TextProps) {
	const { element, className: variantClassName } = textVariants[variant];
	const Element = as ?? element;
	return <Element className={cn(variantClassName, className)}>{children}</Element>;
}
