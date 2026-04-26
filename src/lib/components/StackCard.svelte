<script lang="ts">
	export let name: string;
	export let status: 'online' | 'offline' | 'standby';
	export let services: string[];
	export let variant: 'blue' | 'green';

	const titleGradient =
		variant === 'blue'
			? 'linear-gradient(to right, #000080, #1084d0)'
			: 'linear-gradient(to right, #006400, #228b22)';

	const pillColor = variant === 'blue' ? '#000080' : '#005000';

	const statusLabel: Record<typeof status, string> = {
		online: 'ON',
		offline: 'OFF',
		standby: 'SBY'
	};

	const statusBg: Record<typeof status, string> = {
		online: '#00aa00',
		offline: '#cc0000',
		standby: '#aa8800'
	};
</script>

<div class="bevel-button bg-[#d4d0c8]">
	<div class="flex items-center gap-1.5 px-2 py-1" style="background: {titleGradient}">
		<span class="flex-1 truncate font-mono text-xs font-bold text-white">{name}</span>
		<span
			class="shrink-0 px-1 py-px font-mono text-[8px] leading-none font-bold text-white"
			style="background: {statusBg[status]}">{statusLabel[status]}</span
		>
	</div>

	<div class="p-2">
		{#if services.length > 0}
			<div class="flex flex-wrap gap-1">
				{#each services as svc (svc)}
					<span
						class="bevel-button bg-white px-2 py-1 font-mono text-[10px] leading-none font-bold"
						style="color: {pillColor}">{svc}</span
					>
				{/each}
			</div>
		{:else}
			<p class="font-mono text-[9px] text-gray-500 italic">standby - no services</p>
		{/if}
	</div>
</div>
