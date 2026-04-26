<script lang="ts">
	import RetroDiv from './RetroDiv.svelte';
	import GuestbookForm from './GuestbookForm.svelte';
	import GuestbookEntry from './GuestbookEntry.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { guestbookSchema } from '$lib/schema.js';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { GuestbookEntry as GuestbookEntryType, PaginationInfo } from '$lib/schema.js';

	export let data;

	let serverMessage = '';

	const { form, enhance, submitting } = superForm(data.form, {
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

	$: entries = data.entries as GuestbookEntryType[];
	$: pagination = data.pagination as PaginationInfo;

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
					<GuestbookForm {form} {enhance} {submitting} {serverMessage} />
				</td>
			</tr>
			<tr>
				<th class="bevel-button w-[20%] bg-purple-200 p-2 font-bold text-purple-800">Name</th>
				<th class="bevel-button w-[10%] bg-purple-200 p-2 font-bold text-purple-800">Date</th>
				<th class="bevel-button w-[20%] bg-purple-200 p-2 font-bold text-purple-800">Location</th>
				<th class="bevel-button w-[50%] bg-purple-200 p-2 font-bold text-purple-800">Message</th>
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
					<GuestbookEntry {entry} />
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
