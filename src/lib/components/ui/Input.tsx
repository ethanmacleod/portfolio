import type { ChangeEvent, ComponentProps } from 'react';
import { cn } from '~/lib/utils';

type InputProps = Omit<ComponentProps<'input'>, 'onChange'> & {
	onChange?: (value: string) => void;
	onChangeEvent?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ onChange, onChangeEvent, className, ...props }: InputProps) {
	return (
		<input
			{...props}
			className={cn('bevel-inset', className)}
			onChange={(event) => {
				onChange?.(event.target.value);
				onChangeEvent?.(event);
			}}
		/>
	);
}

type TextareaProps = Omit<ComponentProps<'textarea'>, 'onChange'> & {
	onChange?: (value: string) => void;
	onChangeEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({ onChange, onChangeEvent, className, ...props }: TextareaProps) {
	return (
		<textarea
			{...props}
			className={cn('bevel-inset', className)}
			onChange={(event) => {
				onChange?.(event.target.value);
				onChangeEvent?.(event);
			}}
		/>
	);
}
