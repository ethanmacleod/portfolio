import { useForm, useStore } from '@tanstack/react-form';
import { Link, useRouter, useRouterState } from '@tanstack/react-router';
import { isEqual } from 'lodash-es';
import { useState } from 'react';
import { Input } from '~/lib/components/Input';
import { RetroDiv } from '~/lib/components/RetroDiv';
import {
	addGuestbookEntry,
	type GuestbookEntry,
	type GuestbookPage
} from '~/lib/guestbook.functions';
import { guestbookSchema } from '~/lib/schema';
import { cn, formatNumber, formatNzDay } from '~/lib/utils';

const guestbookErrorMessages = {
	RATE_LIMIT: 'Too many messages... perhaps an email might get your point across better?',
	SUBMIT_FAILED: 'Something broke while signing the guestbook. Give it another go in a minute.',
	REQUIRED_NAME: 'Gotta tell me who you are first',
	REQUIRED_MESSAGE: 'You signed the guestbook but forgot to write anything',
	TOO_LONG_NAME: 'Thats not your name buddy',
	TOO_LONG_MESSAGE: 'What are you writing? An essay? Pls stop',
	TOO_LONG_LOCATION: 'Are you by chance welsh?',
	SWEAR_WORDS_NAME:
		'Maybe people call you those words in private but I wont let you call yourself that. Just looking out for you bud',
	SWEAR_WORDS_MESSAGE:
		'Cmon man the website might not look professional but theres no need for all that',
	SWEAR_WORDS_LOCATION: 'Surely not.'
} as const;

type GuestbookErrorCode = keyof typeof guestbookErrorMessages;
type SubmitErrorCode = Extract<GuestbookErrorCode, 'RATE_LIMIT' | 'SUBMIT_FAILED'>;

const requiredFieldErrorCodes: GuestbookErrorCode[] = ['REQUIRED_NAME', 'REQUIRED_MESSAGE'];

function isGuestbookErrorCode(value: string): value is GuestbookErrorCode {
	return Object.hasOwn(guestbookErrorMessages, value);
}

const guestbookColumns = [
	{ label: 'Name', width: 'w-[20%]' },
	{ label: 'Date', width: 'w-[10%]' },
	{ label: 'Location', width: 'w-[20%]' },
	{ label: 'Message', width: 'w-[50%]' }
];

const emptyGuestbookForm = { name: '', location: '', message: '' };

type GuestbookFormValues = typeof emptyGuestbookForm;

export type GuestbookLoadState =
	| { status: 'loaded'; guestbookPage: GuestbookPage }
	| { status: 'failed' };

export function Guestbook({ guestbook }: { guestbook: GuestbookLoadState }) {
	return (
		<RetroDiv>
			<table className="-ml-[2px] w-[calc(100%+4px)] table-auto border-collapse bg-yellow-100">
				<thead>
					<tr>
						<td colSpan={4} className="bg-gradient-to-r from-green-600 to-blue-600 p-2 text-center">
							<span className="retro-text-shadow text-lg font-bold text-white">
								Sign My Guestbook :3
							</span>
						</td>
					</tr>
					<tr className="bg-yellow-100">
						<td colSpan={4} className="p-3 text-center">
							<GuestbookForm />
						</td>
					</tr>
					<tr>
						{guestbookColumns.map((column) => (
							<th
								key={column.label}
								className={cn(
									'bevel-button bg-purple-200 p-2 font-bold text-purple-800',
									column.width
								)}
							>
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				{guestbook.status === 'loaded' ? (
					<GuestbookEntries guestbookPage={guestbook.guestbookPage} />
				) : (
					<tbody>
						<tr>
							<td colSpan={4} className="p-4 text-center text-red-700">
								The guestbook couldn't be loaded right now. Try refreshing in a minute.
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</RetroDiv>
	);
}

function GuestbookEntries({ guestbookPage }: { guestbookPage: GuestbookPage }) {
	const { entries, currentPage, totalCount, totalPages } = guestbookPage;
	const isLoadingPage = useRouterState({ select: (state) => state.isLoading });
	const hasPreviousPage = currentPage > 1;
	const hasNextPage = currentPage < totalPages;

	return (
		<>
			<tbody className={cn(isLoadingPage && 'opacity-50')}>
				{entries.length === 0 ? (
					<tr>
						<td colSpan={4} className="p-4 text-center text-gray-500">
							No entries yet. Be the first to sign!
						</td>
					</tr>
				) : (
					entries.map((entry) => <GuestbookEntryRow key={entry.id} entry={entry} />)
				)}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={4} className="bg-gradient-to-r from-purple-300 to-pink-300 p-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-bold text-purple-800">
								Total Entries: {formatNumber(totalCount)}
								{entries.length > 0 && (
									<>
										{' '}
										| <span className="blink">New!</span>
									</>
								)}
							</span>

							{totalPages > 1 && (
								<div className="flex items-center gap-2">
									<GuestbookPageLink page={currentPage - 1} disabled={!hasPreviousPage}>
										‹ Prev
									</GuestbookPageLink>
									<span className="px-2 text-xs font-bold text-purple-800">
										{currentPage} / {totalPages}
									</span>
									<GuestbookPageLink page={currentPage + 1} disabled={!hasNextPage}>
										Next ›
									</GuestbookPageLink>
								</div>
							)}
						</div>
					</td>
				</tr>
			</tfoot>
		</>
	);
}

type GuestbookPageLinkProps = {
	page: number;
	disabled: boolean;
	children: string;
};

function GuestbookPageLink({ page, disabled, children }: GuestbookPageLinkProps) {
	return (
		<Link
			to="/"
			search={{ page }}
			disabled={disabled}
			resetScroll={false}
			className={cn(
				'bevel-button bg-white px-2 py-1 text-xs font-bold',
				disabled && 'cursor-not-allowed opacity-50'
			)}
		>
			{children}
		</Link>
	);
}

function GuestbookEntryRow({ entry }: { entry: GuestbookEntry }) {
	return (
		<tr className="border-b border-gray-200">
			<td className="bevel-inset bg-yellow-50 p-2 text-sm font-semibold">{entry.name}</td>
			<td className="bevel-inset bg-yellow-50 p-2 text-sm">{formatNzDay(entry.createdAt)}</td>
			<td className="bevel-inset bg-yellow-50 p-2 text-sm">{entry.location || '-'}</td>
			<td className="bevel-inset bg-yellow-50 p-2 text-sm">{entry.message}</td>
		</tr>
	);
}

function GuestbookForm() {
	const router = useRouter();
	const [submitError, setSubmitError] = useState<{
		code: SubmitErrorCode;
		values: GuestbookFormValues;
	} | null>(null);

	const form = useForm({
		defaultValues: emptyGuestbookForm,
		validators: { onSubmit: guestbookSchema },
		onSubmit: async ({ value, formApi }) => {
			setSubmitError(null);
			try {
				const response = await addGuestbookEntry({ data: value });
				if (response.result === 'rateLimited') {
					setSubmitError({ code: 'RATE_LIMIT', values: value });
					return;
				}
				formApi.reset();
				await router.invalidate({ filter: (match) => match.routeId === '/' });
			} catch (error) {
				console.error('guestbook: failed to add entry', error);
				setSubmitError({ code: 'SUBMIT_FAILED', values: value });
			}
		}
	});

	const values = useStore(form.store, (state) => state.values);
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const hasAttemptedSubmit = useStore(form.store, (state) => state.submissionAttempts > 0);
	const currentSubmitError =
		submitError && isEqual(submitError.values, values) ? submitError.code : null;
	const errorCode = currentSubmitError ?? getValidationErrorCode(values, hasAttemptedSubmit);

	return (
		<div className="bevel-button inline-block bg-gray-200 p-3">
			<form
				className="flex flex-wrap items-center gap-2"
				onSubmit={(event) => {
					event.preventDefault();
					void form.handleSubmit();
				}}
			>
				<form.Field name="name">
					{(field) => (
						<label className="flex items-center gap-2">
							<span className="text-sm font-bold">Name:</span>
							<Input
								type="text"
								className="px-2 py-1 text-sm"
								placeholder="Your name"
								required
								value={field.state.value}
								onChange={field.handleChange}
								onBlur={field.handleBlur}
							/>
						</label>
					)}
				</form.Field>
				<form.Field name="location">
					{(field) => (
						<label className="flex items-center gap-2">
							<span className="text-sm font-bold">Location:</span>
							<Input
								type="text"
								className="px-2 py-1 text-sm"
								placeholder="Optional"
								value={field.state.value}
								onChange={field.handleChange}
								onBlur={field.handleBlur}
							/>
						</label>
					)}
				</form.Field>
				<form.Field name="message">
					{(field) => (
						<label className="flex flex-1 items-center gap-2">
							<span className="text-sm font-bold">Message:</span>
							<Input
								type="text"
								className="flex-1 px-2 py-1 text-sm"
								placeholder="Leave a message!"
								required
								value={field.state.value}
								onChange={field.handleChange}
								onBlur={field.handleBlur}
							/>
						</label>
					)}
				</form.Field>
				<button
					type="submit"
					disabled={isSubmitting}
					className="bevel-button bg-blue-500 px-3 py-1 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Signing...' : 'Sign!'}
				</button>
			</form>
			{errorCode && (
				<div className="bevel-inset mt-3 border-2 p-3 text-center text-sm" role="alert">
					{guestbookErrorMessages[errorCode]}
				</div>
			)}
		</div>
	);
}

function getValidationErrorCode(values: GuestbookFormValues, hasAttemptedSubmit: boolean) {
	const result = guestbookSchema.safeParse(values);
	if (result.success) return null;
	return (
		result.error.issues
			.map((issue) => issue.message)
			.filter(isGuestbookErrorCode)
			.find((code) => hasAttemptedSubmit || !requiredFieldErrorCodes.includes(code)) ?? null
	);
}
