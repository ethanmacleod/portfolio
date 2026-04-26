<script lang="ts">
	import type { GuestbookEntry } from '$lib/types';
	import { formatDate } from '$lib/functions';

	export let entry: GuestbookEntry;
</script>

<tr class="border-b border-gray-200">
	<td class="bevel-inset bg-yellow-50 p-2 text-sm font-semibold">{entry.name}</td>
	<td class="bevel-inset bg-yellow-50 p-2 text-sm">{formatDate(entry.createdAt)}</td>
	<td class="bevel-inset bg-yellow-50 p-2 text-sm">{entry.location || '-'}</td>
	<td class="bevel-inset bg-yellow-50 p-2 text-sm">{entry.message}</td>
</tr>
