<script lang="ts">
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import LeftNav from '$lib/components/nav/left-nav.svelte';
	import Header from '$lib/components/nav/header.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	export let data: LayoutData;

	const fullscreenRoutes = ['/boids'];
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<div
	class="flex h-screen gap-4 p-2 font-serif"
	style="background-color: #005050; background-image: linear-gradient(45deg, #003d3d 25%, transparent 25%), linear-gradient(-45deg, #003d3d 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #003d3d 75%), linear-gradient(-45deg, transparent 75%, #003d3d 75%); background-size: 8px 8px; background-position: 0 0, 0 4px, 4px -4px, -4px 0px;"
>
	<aside class="bevel-button h-full w-[220px] shrink-0 overflow-y-auto bg-[#c0c0c0] p-3 text-black">
		<LeftNav />
	</aside>

	<div class="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
		<Header analytics={data.analytics} />

		<main
			class="bevel-inset flex-1 overflow-auto bg-[#d4d4d4]"
			class:p-8={!fullscreenRoutes.includes($page.url.pathname)}
		>
			<slot />
		</main>

		<footer
			class="bevel-button shrink-0 overflow-hidden bg-gradient-to-t from-gray-900 to-gray-700 py-2 text-white"
		>
			<div class="marquee-track">
				<span class="marquee-item neon-glow text-cyan-400"
					>★ Welcome! Last updated: {new Date().toLocaleDateString()} - Thanks for visiting! ★</span
				>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-yellow-300">Proudly made by Ethan MacLeod</span>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-purple-300"
					>Best viewed in whatever resolution you currently have</span
				>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-green-400"
					>No cookies. But I am actually logging your IP address everytime you visit</span
				>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-orange-300">Est. 2024 - Always under construction</span>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item neon-glow text-cyan-400"
					>★ Welcome! Last updated: {new Date().toLocaleDateString()} - Thanks for visiting! ★</span
				>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-yellow-300">Proudly made by Ethan MacLeod</span>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-purple-300"
					>Best viewed in whatever resolution you currently have</span
				>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-green-400"
					>No cookies. But I am actually logging your IP address everytime you visit</span
				>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
				<span class="marquee-item text-orange-300">Est. 2024 - Always under construction</span>
				<span class="marquee-sep rainbow-text">&gt;&gt;</span>
			</div>
		</footer>
	</div>
</div>
