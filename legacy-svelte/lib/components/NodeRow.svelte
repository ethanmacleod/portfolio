<script lang="ts">
	export let model: string;
	export let role: string;
	export let cpu: string;
	export let ram: string;
	export let storage: string;
	export let os: string;
	export let status: 'online' | 'offline' | 'standby';
	export let unit: number;

	const statusDot: Record<typeof status, string> = {
		online: 'bg-green-500',
		offline: 'bg-red-500',
		standby: 'bg-yellow-400'
	};
</script>

<div class="bevel-inset flex items-center gap-3 bg-white px-3 py-2">
	<div class="flex w-44 shrink-0 items-center gap-2">
		<span class="h-2 w-2 shrink-0 rounded-full {statusDot[status]}"></span>
		<div>
			<p class="font-mono text-xs font-bold text-[#000080]">{model}</p>
			<p class="font-mono text-[10px] text-gray-500">{role}</p>
		</div>
	</div>
	<div class="h-8 w-px shrink-0 bg-gray-300"></div>
	<div class="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1">
		<div>
			<p class="font-mono text-[10px] text-gray-500">CPU</p>
			<p class="font-mono text-xs text-gray-700">{cpu}</p>
		</div>
		<div>
			<p class="font-mono text-[10px] text-gray-500">RAM</p>
			<p class="font-mono text-xs text-gray-700">{ram}</p>
		</div>
		<div>
			<p class="font-mono text-[10px] text-gray-500">STORAGE</p>
			<p class="font-mono text-xs text-gray-700">{storage}</p>
		</div>
		<div>
			<p class="font-mono text-[10px] text-gray-500">OS</p>
			<p class="font-mono text-xs text-gray-700">{os}</p>
		</div>
	</div>
	<span class="shrink-0 font-mono text-[10px] text-gray-400">U{unit}</span>
</div>
