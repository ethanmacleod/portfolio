<script lang="ts">
	import Header from '$lib/components/nav/header.svelte';
	import LeftNav from '$lib/components/nav/left-nav.svelte';
	import DynamicHeader from '$lib/components/DynamicHeader.svelte';
	import ScreenTooSmall from '$lib/components/ScreenTooSmall.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<ScreenTooSmall />

<div
	class="grid min-h-screen grid-cols-[220px_1fr] grid-rows-[auto_1fr_auto] gap-1 bg-gradient-to-b from-purple-900 via-blue-900 to-black p-2 font-serif"
>
	<aside class="bevel-button row-span-2 bg-gradient-to-b from-gray-700 to-gray-900 p-3 text-white">
		<LeftNav />
	</aside>

	<header class="bevel-button bg-gradient-to-r from-black to-gray-900 text-white">
		<div class="flex h-full w-full items-center justify-between">
			<div class="my-2 ml-2">
				<Header analytics={data.analytics} />
			</div>
			<DynamicHeader />
		</div>
	</header>

	<main class="bevel-inset overflow-auto bg-gradient-to-br from-white to-gray-100 p-4">
		<slot />
	</main>

	<footer
		class="bevel-button col-span-2 overflow-hidden bg-gradient-to-t from-gray-900 to-gray-700 p-2 text-center text-white"
	>
		<div class="scroll-text whitespace-nowrap">
			<span class="neon-glow text-cyan-400"
				>★ Welcome! Last updated: {new Date().toLocaleDateString()} Thanks for visiting! ★</span
			>
		</div>
	</footer>
</div>
