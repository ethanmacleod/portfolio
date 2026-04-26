<script lang="ts">
	import UsesCard from '$lib/components/UsesCard.svelte';
	import RetroDiv from '$lib/components/RetroDiv.svelte';
	import { sections } from '$lib/config/uses';
</script>

<svelte:head>
	<title>Uses - Ethan MacLeod</title>
	<meta name="description" content="What I use - hardware, software, and more" />
</svelte:head>

<div class="flex h-full min-h-0 flex-col gap-3">
	<RetroDiv width="w-full" className="shrink-0 p-3">
		<h1 class="font-mono text-base font-bold text-blue-700">// USES.TXT</h1>
		<p class="mt-1 font-mono text-xs text-gray-600">
			Hardware, software, and everything I couldn't put on the other pages.
		</p>
	</RetroDiv>

	<div class="min-h-0 flex-1 overflow-auto">
		<div class="grid grid-cols-2 gap-3 xl:grid-cols-3">
			{#each sections as section (section.title)}
				<UsesCard {section} />
			{/each}
		</div>
	</div>
</div>
