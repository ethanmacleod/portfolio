import type { ComponentProps } from 'react';
import { cn } from '~/lib/utils';

const bevelButtonVariants = {
	face: 'bg-win-face text-black hover:bg-win-face-hover',
	button: 'bg-win-button text-black hover:bg-win-button-hover',
	light: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
	white: 'bg-white text-gray-700',
	dark: 'bg-gray-700 text-white hover:bg-gray-600',
	primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90',
	selected: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
	submit: 'bg-blue-500 text-white'
} as const;

const bevelButtonSizes = {
	small: 'px-2 py-1 text-xs',
	medium: 'px-3 py-1.5 text-xs',
	large: 'px-6 py-2 text-xs'
} as const;

type BevelButtonVariant = keyof typeof bevelButtonVariants;
type BevelButtonSize = keyof typeof bevelButtonSizes;

type BevelButtonStyle = {
	variant: BevelButtonVariant;
	size?: BevelButtonSize;
	className?: string;
};

export function bevelButtonClassName({ variant, size = 'small', className }: BevelButtonStyle) {
	return cn(
		'bevel-button font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
		bevelButtonVariants[variant],
		bevelButtonSizes[size],
		className
	);
}

type BevelButtonProps = Omit<ComponentProps<'button'>, 'className'> &
	BevelButtonStyle & {
		isPending?: boolean;
	};

export function BevelButton({
	variant,
	size,
	className,
	isPending = false,
	disabled,
	type = 'button',
	...props
}: BevelButtonProps) {
	return (
		<button
			{...props}
			type={type}
			disabled={disabled || isPending}
			aria-busy={isPending}
			className={bevelButtonClassName({
				variant,
				size,
				className: cn(isPending && 'cursor-wait', className)
			})}
		/>
	);
}
