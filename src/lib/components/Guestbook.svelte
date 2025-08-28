<script lang="ts">
	import RetroDiv from './RetroDiv.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { guestbookSchema } from '../../routes/schema.js';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	export let data;

	interface GuestbookEntry {
		id: number;
		name: string;
		message: string;
		location?: string;
		createdAt: Date;
	}

	interface PaginationInfo {
		page: number;
		limit: number;
		totalCount: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	}

	let serverMessage = '';

	const { form, enhance, submitting, message } = superForm(data.form, {
		validators: zodClient(guestbookSchema),
		resetForm: true,
		onResult: async ({ result }) => {
			if (result.type === 'failure' && result.data?.message) {
				serverMessage = result.data.message;
			} else if (result.type === 'success') {
				serverMessage = '';
				await invalidateAll();
			}
		}
	});

	$: entries = data.entries as GuestbookEntry[];
	$: pagination = data.pagination as PaginationInfo;

	type ErrorType =
		| 'RATE_LIMIT'
		| 'TOO_LONG_NAME'
		| 'TOO_LONG_MESSAGE'
		| 'TOO_LONG_LOCATION'
		| 'SWEAR_WORDS_NAME'
		| 'SWEAR_WORDS_MESSAGE'
		| 'SWEAR_WORDS_LOCATION';

	const errorMessages: Record<ErrorType, string> = {
		RATE_LIMIT: 'Too many messages... perhaps an email might get your point across better?',
		TOO_LONG_NAME: 'Thats not your name buddy',
		TOO_LONG_MESSAGE: 'What are you writing? An essay? Pls stop',
		TOO_LONG_LOCATION: 'Are you by chance welsh?',
		SWEAR_WORDS_NAME:
			'Maybe people call you those words in private but I wont let you call yourself that. Just looking out for you bud',
		SWEAR_WORDS_MESSAGE:
			'Cmon man the website might not look professional but theres no need for all that',
		SWEAR_WORDS_LOCATION: 'Surely not.'
	};

	const clientValidation = derived(form, ($formData) => {
		if (!$formData.name && !$formData.message && !$formData.location) return null;

		try {
			guestbookSchema.parse($formData);
			return null;
		} catch (error: any) {
			if (error.issues) {
				for (const issue of error.issues) {
					if (issue.message === 'TOO_LONG_NAME') return 'TOO_LONG_NAME';
					if (issue.message === 'TOO_LONG_MESSAGE') return 'TOO_LONG_MESSAGE';
					if (issue.message === 'TOO_LONG_LOCATION') return 'TOO_LONG_LOCATION';
					if (issue.message === 'SWEAR_WORDS_NAME') return 'SWEAR_WORDS_NAME';
					if (issue.message === 'SWEAR_WORDS_MESSAGE') return 'SWEAR_WORDS_MESSAGE';
					if (issue.message === 'SWEAR_WORDS_LOCATION') return 'SWEAR_WORDS_LOCATION';
				}
			}
			return null;
		}
	});

	$: currentError = (() => {
		if (
			serverMessage &&
			serverMessage.includes('You have reached the maximum number of guestbook entries')
		) {
			return 'RATE_LIMIT';
		}
		if (serverMessage) {
			if (serverMessage.includes('too long')) {
				if (serverMessage.includes('name')) return 'TOO_LONG_NAME';
				if (serverMessage.includes('message')) return 'TOO_LONG_MESSAGE';
				if (serverMessage.includes('location')) return 'TOO_LONG_LOCATION';
			}
			return null;
		}
		return $clientValidation as ErrorType | null;
	})();

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function changePage(newPage: number) {
		if (newPage >= 1 && newPage <= pagination.totalPages) {
			const url = new URL($page.url);
			url.searchParams.set('page', newPage.toString());
			goto(url.toString());
		}
	}
</script>

<RetroDiv width="w-full">
	<table class="w-full table-auto border-collapse bg-yellow-100">
		<thead>
			<tr>
				<td colspan="4" class="bg-gradient-to-r from-green-600 to-blue-600 p-2 text-center">
					<span class="retro-text-shadow text-lg font-bold text-white">Sign My Guestbook :3</span>
				</td>
			</tr>
			<tr class="bg-yellow-100">
				<td colspan="4" class="p-3 text-center">
					<div class="bevel-button inline-block bg-gray-200 p-3">
						<form
							class="flex flex-wrap items-center gap-2"
							method="POST"
							action="?/addEntry"
							use:enhance
						>
							<span class="text-sm font-bold">Name:</span>
							<input
								type="text"
								name="name"
								class="bevel-inset px-2 py-1 text-sm"
								placeholder="Your name"
								bind:value={$form.name}
								required
							/>
							<span class="text-sm font-bold">Location:</span>
							<input
								type="text"
								name="location"
								class="bevel-inset px-2 py-1 text-sm"
								placeholder="Optional"
								bind:value={$form.location}
							/>
							<span class="text-sm font-bold">Message:</span>
							<input
								type="text"
								name="message"
								class="bevel-inset flex-1 px-2 py-1 text-sm"
								placeholder="Leave a message!"
								bind:value={$form.message}
								required
							/>
							<button
								type="submit"
								class="bevel-button bg-blue-500 px-3 py-1 text-sm font-bold text-white {$submitting
									? 'cursor-not-allowed opacity-50'
									: ''}"
								disabled={$submitting}
							>
								{$submitting ? 'Signing...' : 'Sign!'}
							</button>
						</form>
						{#if currentError}
							{@const errorInfo = errorMessages[currentError]}
							<div class="bevel-inset mt-3 border-2 p-3 text-sm">
								<div class="flex items-center gap-2 text-center">
									<span class="text-center">{errorInfo}</span>
								</div>
							</div>
						{/if}
					</div>
				</td>
			</tr>
			<tr>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Name</th>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Date</th>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Location</th>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Message</th>
			</tr>
		</thead>
		<tbody>
			{#if entries.length === 0}
				<tr>
					<td colspan="4" class="p-4 text-center text-gray-500"
						>No entries yet. Be the first to sign!</td
					>
				</tr>
			{:else}
				{#each entries as entry (entry.id)}
					<tr class="border-b border-gray-200">
						<td class="bevel-inset bg-yellow-50 p-2 text-sm font-semibold">{entry.name}</td>
						<td class="bevel-inset bg-yellow-50 p-2 text-sm">{formatDate(entry.createdAt)}</td>
						<td class="bevel-inset bg-yellow-50 p-2 text-sm">{entry.location || '-'}</td>
						<td class="bevel-inset bg-yellow-50 p-2 text-sm">{entry.message}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="4" class="bg-gradient-to-r from-purple-300 to-pink-300 p-2">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-purple-800">
							Total Entries: {pagination.totalCount}
							{#if entries.length > 0}| <span class="blink">New!</span>{/if}
						</span>

						{#if pagination.totalPages > 1}
							<div class="flex items-center gap-2">
								<button
									class="bevel-button bg-white px-2 py-1 text-xs font-bold {!pagination.hasPrev
										? 'cursor-not-allowed opacity-50'
										: ''}"
									disabled={!pagination.hasPrev}
									on:click={() => changePage(pagination.page - 1)}
								>
									‹ Prev
								</button>
								<span class="px-2 text-xs font-bold text-purple-800">
									{pagination.page} / {pagination.totalPages}
								</span>
								<button
									class="bevel-button bg-white px-2 py-1 text-xs font-bold {!pagination.hasNext
										? 'cursor-not-allowed opacity-50'
										: ''}"
									disabled={!pagination.hasNext}
									on:click={() => changePage(pagination.page + 1)}
								>
									Next ›
								</button>
							</div>
						{/if}
					</div>
				</td>
			</tr>
		</tfoot>
	</table>
</RetroDiv>
