<script lang="ts">
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import LeftNav from '$lib/components/nav/left-nav.svelte';
	import Header from '$lib/components/nav/header.svelte';
	import ScreenTooSmall from '$lib/components/ScreenTooSmall.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { dev } from '$app/environment';

	export let data: LayoutData;
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<ScreenTooSmall />

<div
	class="grid min-h-screen grid-cols-[220px_1fr] grid-rows-[128px_1fr_auto] gap-1 bg-gradient-to-b from-purple-900 via-blue-900 to-black p-2 font-serif"
>
	<aside class="bevel-button row-span-2 bg-gradient-to-b from-gray-700 to-gray-900 p-3 text-white">
		<LeftNav />
	</aside>

	<Header analytics={data.analytics} />

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
