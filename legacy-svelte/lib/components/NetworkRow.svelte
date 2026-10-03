<script lang="ts">
	export let name: string;
	export let model: string;
	export let notes: string | undefined = undefined;
</script>

<div class="bevel-inset flex items-center gap-2 bg-white px-3 py-2">
	<span class="h-2 w-2 shrink-0 rounded-full bg-[#000080]"></span>
	<div class="flex flex-1 items-baseline gap-3">
		<p class="w-36 shrink-0 font-mono text-[10px] font-bold text-[#000080]">{name}</p>
		<p class="font-mono text-xs text-gray-700">{model}</p>
		{#if notes}
			<p class="ml-auto font-mono text-[10px] text-gray-500">{notes}</p>
		{/if}
	</div>
</div>
