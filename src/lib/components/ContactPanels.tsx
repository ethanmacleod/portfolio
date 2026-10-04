import { useForm, useStore } from '@tanstack/react-form';
import { useState, type ReactNode } from 'react';
import { Inset } from '~/lib/components/ui/Bevel';
import { BevelButton, bevelButtonClassName } from '~/lib/components/ui/BevelButton';
import { Input, Textarea } from '~/lib/components/ui/Input';
import { Text } from '~/lib/components/ui/Text';
import { SectionWindow, Window } from '~/lib/components/ui/Window';
import { availability, socials } from '~/lib/config/contact';
import { sendContactMessage } from '~/lib/contact.functions';
import { contactSchema } from '~/lib/schema';
import { cn } from '~/lib/utils';

const submitErrorMessages = {
	rateLimited: 'Too many messages sent. Please try again in an hour.',
	notConfigured: 'Contact form is not configured. Please try reaching out via social links.',
	failed:
		'Something went wrong sending your message. Please try again or reach out via social links.'
} as const;

type SubmitState = 'idle' | 'sent' | keyof typeof submitErrorMessages;

const inputClassName = 'bg-white px-2 py-1.5 font-mono text-xs text-gray-800 outline-none';

export function ContactFormWindow() {
	const [submitState, setSubmitState] = useState<SubmitState>('idle');

	return (
		<Window className="flex-1 overflow-auto p-4">
			{submitState === 'sent' ? (
				<Inset
					tone="success"
					className="flex h-full flex-col items-center justify-center gap-3 p-8"
				>
					<span className="font-mono text-2xl">✓</span>
					<p className="font-mono text-sm font-bold text-green-700">MESSAGE SENT SUCCESSFULLY</p>
					<Text variant="description">I'll get back to you within ~24 hours.</Text>
				</Inset>
			) : (
				<ContactForm submitState={submitState} onSubmitStateChange={setSubmitState} />
			)}
		</Window>
	);
}

export function ContactStatusPanel() {
	return (
		<SectionWindow label="Current status">
			<div className="flex flex-col gap-2">
				<Text variant="value">{availability}</Text>
				<Text variant="value">I'm in New Zealand and usually reply within a day.</Text>
			</div>
		</SectionWindow>
	);
}

export function ContactSocialLinks() {
	return (
		<SectionWindow label="Find me elsewhere" grows>
			<div className="flex flex-col gap-2">
				{socials.map((social) => (
					<a
						key={social.label}
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						className={bevelButtonClassName({
							variant: 'face',
							className: 'flex items-center gap-3 px-3 py-2 font-normal'
						})}
					>
						<span style={{ color: social.color }} className="shrink-0">
							<social.Icon className="h-4 w-4" />
						</span>
						<span className="font-mono text-xs font-bold text-gray-800">{social.label}</span>
						<span className="ml-auto font-mono text-xs text-gray-500">→</span>
					</a>
				))}
			</div>
		</SectionWindow>
	);
}

type ContactFormProps = {
	submitState: SubmitState;
	onSubmitStateChange: (submitState: SubmitState) => void;
};

function ContactForm({ submitState, onSubmitStateChange }: ContactFormProps) {
	const form = useForm({
		defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
		validators: { onSubmit: contactSchema },
		onSubmit: async ({ value }) => {
			try {
				const response = await sendContactMessage({ data: value });
				onSubmitStateChange(response.result);
			} catch (error) {
				console.error('contact: failed to send message', error);
				onSubmitStateChange('failed');
			}
		}
	});
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

	return (
		<form
			className="flex flex-col gap-3"
			onSubmit={(event) => {
				event.preventDefault();
				void form.handleSubmit();
			}}
		>
			{submitState !== 'idle' && submitState !== 'sent' && (
				<Inset tone="danger" role="alert" className="p-2">
					<p className="font-mono text-xs text-red-700">{submitErrorMessages[submitState]}</p>
				</Inset>
			)}

			<div className="grid grid-cols-2 gap-3">
				<form.Field name="name">
					{(field) => (
						<FormField label="NAME *" errorMessage={field.state.meta.errors.at(0)?.message}>
							<Input
								type="text"
								maxLength={100}
								className={inputClassName}
								placeholder="Your name"
								value={field.state.value}
								onChange={field.handleChange}
								onBlur={field.handleBlur}
							/>
						</FormField>
					)}
				</form.Field>
				<form.Field name="email">
					{(field) => (
						<FormField label="EMAIL *" errorMessage={field.state.meta.errors.at(0)?.message}>
							<Input
								type="email"
								maxLength={200}
								className={inputClassName}
								placeholder="you@example.com"
								value={field.state.value}
								onChange={field.handleChange}
								onBlur={field.handleBlur}
							/>
						</FormField>
					)}
				</form.Field>
			</div>

			<form.Field name="subject">
				{(field) => (
					<FormField label="SUBJECT" errorMessage={field.state.meta.errors.at(0)?.message}>
						<Input
							type="text"
							maxLength={200}
							className={inputClassName}
							placeholder="What's this about?"
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
						/>
					</FormField>
				)}
			</form.Field>

			<form.Field name="message">
				{(field) => (
					<FormField label="MESSAGE *" errorMessage={field.state.meta.errors.at(0)?.message}>
						<Textarea
							maxLength={5000}
							rows={8}
							className={cn(inputClassName, 'resize-none')}
							placeholder="Write your message here..."
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
						/>
					</FormField>
				)}
			</form.Field>

			<form.Field name="website">
				{(field) => (
					<div aria-hidden="true" className="absolute -left-[9999px]">
						<Input
							type="text"
							name="website"
							tabIndex={-1}
							autoComplete="off"
							value={field.state.value}
							onChange={field.handleChange}
						/>
					</div>
				)}
			</form.Field>

			<div className="flex items-center justify-between">
				<span className="font-mono text-xs text-gray-500">* required fields</span>
				<BevelButton
					type="submit"
					variant="primary"
					size="large"
					isPending={isSubmitting}
					className="font-mono"
				>
					{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
				</BevelButton>
			</div>
		</form>
	);
}

type FormFieldProps = {
	label: string;
	errorMessage?: string;
	children: ReactNode;
};

function FormField({ label, errorMessage, children }: FormFieldProps) {
	return (
		<label className="flex flex-col gap-1">
			<Text variant="fieldLabel">{label}</Text>
			{children}
			{errorMessage && <span className="font-mono text-xs text-red-600">{errorMessage}</span>}
		</label>
	);
}
