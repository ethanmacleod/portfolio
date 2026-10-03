<script lang="ts">
	import RetroDiv from '$lib/components/RetroDiv.svelte';
	import StackCard from '$lib/components/StackCard.svelte';
	import NodeRow from '$lib/components/NodeRow.svelte';
	import NodeCard from '$lib/components/NodeCard.svelte';
	import NetworkRow from '$lib/components/NetworkRow.svelte';
	import {
		optiplexNodes,
		piNodes,
		nasModel,
		nasNotes,
		nasDrives,
		extraDrives,
		networking,
		stacks,
		stackCategories,
		categoryVariant
	} from '$lib/config/homelab';

	const totalRam = [...optiplexNodes, ...piNodes].reduce((acc, n) => {
		const gb = parseInt(n.ram);
		return acc + (isNaN(gb) ? 0 : gb);
	}, 0);
</script>

<svelte:head>
	<title>Homelab - Ethan MacLeod</title>
	<meta
		name="description"
		content="My homelab setup - Docker Swarm cluster, networking, and self-hosted stacks"
	/>
	<meta property="og:title" content="Homelab - Ethan MacLeod" />
	<meta
		property="og:description"
		content="My homelab setup - Docker Swarm cluster, networking, and self-hosted stacks"
	/>
</svelte:head>

<div class="h-full overflow-auto">
	<div class="flex flex-col gap-3">
		<RetroDiv width="w-full" className="p-3">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="font-mono text-base font-bold text-blue-700">// HOMELAB.SH</h1>
					<p class="mt-1 font-mono text-xs text-gray-600">
						{optiplexNodes.length} node Docker Swarm &nbsp;·&nbsp; {totalRam}GB total RAM
						&nbsp;·&nbsp; {stacks.filter((s) => s.status === 'online').length} stacks running
					</p>
				</div>
				<div class="flex items-center gap-1.5">
					<span class="blink h-2 w-2 rounded-full bg-green-500"></span>
					<span class="font-mono text-xs font-bold text-green-700">CLUSTER ONLINE</span>
				</div>
			</div>
		</RetroDiv>

		<div class="flex flex-col gap-3 md:flex-row">
			<RetroDiv width="w-full" className="flex-1 p-3">
				<h2 class="mb-3 font-mono text-xs font-bold text-gray-600">
					[ OPTIPLEX CLUSTER - {optiplexNodes.length} NODES ]
				</h2>
				<div class="flex flex-col gap-1.5">
					{#each optiplexNodes as node, i (i)}
						<NodeRow {...node} unit={i + 1} />
					{/each}
				</div>
			</RetroDiv>

			<RetroDiv width="w-full md:w-72" className="shrink-0 p-3">
				<h2 class="mb-3 font-mono text-xs font-bold text-gray-600">
					[ RASPBERRY PI - {piNodes.length} NODES ]
				</h2>
				<div class="flex flex-col gap-1.5">
					{#each piNodes as node (node.model)}
						<NodeCard {...node} />
					{/each}
				</div>
			</RetroDiv>
		</div>

		<div class="flex flex-col gap-3 md:flex-row">
			<RetroDiv width="w-full" className="flex-1 p-3">
				<h2 class="mb-3 font-mono text-xs font-bold text-gray-600">
					[ NETWORKING & INFRASTRUCTURE ]
				</h2>
				<div class="flex flex-col gap-1.5">
					{#each networking as device (device.name)}
						<NetworkRow {...device} />
					{/each}
				</div>
			</RetroDiv>

			<RetroDiv width="w-full md:w-64" className="shrink-0 p-3">
				<h2 class="mb-3 font-mono text-xs font-bold text-gray-600">[ STORAGE ]</h2>
				<div class="flex flex-col gap-2">
					<div class="bevel-button bg-[#d4d0c8]">
						<div class="px-2 py-1" style="background: linear-gradient(to right, #006400, #228b22)">
							<p class="font-mono text-xs font-bold text-white">{nasModel}</p>
						</div>
						<div class="flex flex-col gap-2 p-3">
							{#each nasDrives as drive (drive.label)}
								<div class="flex items-center gap-2">
									<span class="w-10 font-mono text-[10px] text-gray-600">{drive.label}</span>
									<div class="bevel-inset h-4 flex-1 overflow-hidden bg-[#c0bdb5]">
										<div class="h-full w-full bg-[#000080]"></div>
									</div>
									<span class="w-32 font-mono text-[10px] text-gray-700"
										>{drive.size} {drive.type}</span
									>
								</div>
							{/each}
							{#if nasNotes}
								<p class="border-t border-gray-400 pt-2 font-mono text-[10px] text-gray-500">
									{nasNotes}
								</p>
							{/if}
						</div>
					</div>
					<div class="bevel-button bg-[#d4d0c8]">
						<div class="px-2 py-1" style="background: linear-gradient(to right, #000080, #1084d0)">
							<p class="font-mono text-xs font-bold text-white">ADDITIONAL DRIVES</p>
						</div>
						<div class="flex flex-col gap-2 p-3">
							{#each extraDrives as drive (drive.label)}
								<div class="flex items-center gap-2">
									<span class="w-4 font-mono text-[10px] text-gray-600">{drive.label}</span>
									<div class="bevel-inset h-4 flex-1 overflow-hidden bg-[#c0bdb5]">
										<div class="h-full w-full bg-[#006400]"></div>
									</div>
									<span class="w-32 font-mono text-[10px] text-gray-700"
										>{drive.size} {drive.type}</span
									>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</RetroDiv>
		</div>

		<RetroDiv width="w-full" className="p-3">
			<h2 class="mb-3 font-mono text-xs font-bold text-gray-600">
				[ HOSTED STACKS - {stacks.length} TOTAL ]
			</h2>
			<div class="flex flex-col gap-4">
				{#each stackCategories as category (category)}
					<div>
						<p
							class="mb-1.5 font-mono text-[10px] font-bold tracking-widest text-blue-700 uppercase"
						>
							{category}
						</p>
						<div class="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
							{#each stacks.filter((s) => s.category === category) as stack (stack.name)}
								<StackCard
									name={stack.name}
									status={stack.status}
									services={stack.services}
									variant={categoryVariant[category] ?? 'blue'}
								/>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</RetroDiv>
	</div>
</div>
