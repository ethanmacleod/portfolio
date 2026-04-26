<script lang="ts">
	import RetroDiv from '$lib/components/RetroDiv.svelte';
	import type { Section } from '$lib/types';

	let { section }: { section: Section } = $props();
</script>

<RetroDiv width="w-full" className="p-3">
	<h2 class="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-blue-700">
		<span>{section.icon}</span>
		{section.title}
	</h2>
	<div class="flex flex-col gap-1">
		{#each section.items as item (item.label)}
			<div class="flex gap-2 border-b border-gray-200 pb-1 last:border-0 last:pb-0">
				<span class="w-28 shrink-0 font-mono text-xs font-bold text-gray-500">{item.label}</span>
				<span class="min-w-0 font-mono text-xs text-gray-800">{item.value}</span>
			</div>
		{/each}
	</div>
</RetroDiv>
