import { useForm, useStore } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { Input, Textarea } from '~/lib/components/Input';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { socials, status } from '~/lib/config/contact';
import { sendContactMessage } from '~/lib/contact.functions';
import { contactSchema } from '~/lib/schema';
import { pageMeta } from '~/lib/site';
import type { StatusConfig } from '~/lib/types';
import { cn } from '~/lib/utils';

export const Route = createFileRoute('/contact')({
	staticData: {
		heading: {
			title: 'Contact Me!',
			subtitle: "Get in touch - I'd love to hear from you"
		},
		sitemap: { priority: 0.8, changefreq: 'yearly' }
	},
	head: () => ({
		meta: pageMeta('Contact - Ethan MacLeod', 'Get in touch with me')
	}),
	component: ContactPage
});

const submitErrorMessages = {
	rateLimited: 'Too many messages sent. Please try again in an hour.',
	notConfigured: 'Contact form is not configured. Please try reaching out via social links.',
	failed:
		'Something went wrong sending your message. Please try again or reach out via social links.'
} as const;

const availabilityClassNames: Record<StatusConfig['state'], { dot: string; label: string }> = {
	open: { dot: 'bg-availability-open', label: 'text-availability-open' },
	busy: { dot: 'bg-availability-busy', label: 'text-availability-busy' },
	away: { dot: 'bg-availability-away', label: 'text-availability-away' }
};

type SubmitState = 'idle' | 'sent' | keyof typeof submitErrorMessages;

const inputClassName = 'bg-white px-2 py-1.5 font-mono text-xs text-gray-800 outline-none';

function ContactPage() {
	const [submitState, setSubmitState] = useState<SubmitState>('idle');

	return (
		<div className="flex h-full min-h-0 flex-col gap-4 md:flex-row">
			<div className="flex min-w-0 flex-1 flex-col gap-3">
				<RetroDiv className="shrink-0 p-3">
					<h1 className="font-mono text-base font-bold text-blue-700">{'// CONTACT'}</h1>
					<p className="mt-1 font-mono text-xs text-gray-600">
						Fill out the form below and I'll get back to you.
					</p>
				</RetroDiv>

				<RetroDiv className="flex-1 overflow-auto p-4">
					{submitState === 'sent' ? (
						<div className="bevel-inset flex h-full flex-col items-center justify-center gap-3 bg-green-50 p-8">
							<span className="font-mono text-2xl">✓</span>
							<p className="font-mono text-sm font-bold text-green-700">
								MESSAGE SENT SUCCESSFULLY
							</p>
							<p className="font-mono text-xs text-gray-600">
								I'll get back to you within ~24 hours.
							</p>
						</div>
					) : (
						<ContactForm submitState={submitState} onSubmitStateChange={setSubmitState} />
					)}
				</RetroDiv>
			</div>

			<div className="flex w-full shrink-0 flex-col gap-3 md:w-72">
				<RetroDiv className="shrink-0 p-3">
					<h2 className="mb-2 font-mono text-xs font-bold text-gray-600">[ CURRENT STATUS ]</h2>
					<div className="bevel-inset bg-black p-3">
						<div className="flex items-center gap-2">
							<span
								className={cn(
									'blink h-2.5 w-2.5 shrink-0 rounded-full',
									availabilityClassNames[status.state].dot
								)}
							/>
							<span
								className={cn(
									'neon-glow font-mono text-sm font-bold',
									availabilityClassNames[status.state].label
								)}
							>
								{status.label}
							</span>
						</div>
						<p className="mt-2 font-mono text-xs text-gray-400">{status.detail}</p>
						<div className="mt-3 flex flex-col gap-1 border-t border-gray-700 pt-2">
							<StatusRow label="TIMEZONE" value={status.timezone} />
							<StatusRow label="RESPONSE" value={status.response} />
						</div>
					</div>
				</RetroDiv>

				<RetroDiv className="flex-1 p-3">
					<h2 className="mb-2 font-mono text-xs font-bold text-gray-600">[ FIND ME ELSEWHERE ]</h2>
					<div className="flex flex-col gap-2">
						{socials.map((social) => (
							<a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="bevel-button flex items-center gap-3 bg-win-face px-3 py-2 transition-colors hover:bg-win-face-hover"
							>
								<span style={{ color: social.color }} className="shrink-0">
									<social.Icon className="h-4 w-4" />
								</span>
								<span className="font-mono text-xs font-bold text-gray-800">{social.label}</span>
								<span className="ml-auto font-mono text-xs text-gray-500">→</span>
							</a>
						))}
					</div>
				</RetroDiv>
			</div>
		</div>
	);
}

function StatusRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between">
			<span className="font-mono text-xs text-gray-500">{label}</span>
			<span className="font-mono text-xs text-green-400">{value}</span>
		</div>
	);
}

type ContactFormProps = {
	submitState: SubmitState;
	onSubmitStateChange: (submitState: SubmitState) => void;
};

function ContactForm({ submitState, onSubmitStateChange }: ContactFormProps) {
	const form = useForm({
		defaultValues: { name: '', email: '', subject: '', message: '' },
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
				<div className="bevel-inset bg-red-50 p-2" role="alert">
					<p className="font-mono text-xs text-red-700">{submitErrorMessages[submitState]}</p>
				</div>
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

			<div className="flex items-center justify-between">
				<span className="font-mono text-xs text-gray-500">* required fields</span>
				<button
					type="submit"
					disabled={isSubmitting}
					className="bevel-button bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-mono text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
				</button>
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
			<span className="font-mono text-xs font-bold text-gray-700">{label}</span>
			{children}
			{errorMessage && <span className="font-mono text-xs text-red-600">{errorMessage}</span>}
		</label>
	);
}
