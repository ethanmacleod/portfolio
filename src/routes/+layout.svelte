<script lang="ts">
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import LeftNav from '$lib/components/nav/left-nav.svelte';
	import DynamicHeader from '$lib/components/DynamicHeader.svelte';
	import ScreenTooSmall from '$lib/components/ScreenTooSmall.svelte';
	import HighFiveCounter from '$lib/components/HighFiveCounter.svelte';
	import UnderConstructionGif from '$lib/components/UnderConstructionGif.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { dev } from '$app/environment';
	import { numberWithOrdinal } from '$lib/functions';

	export let data: LayoutData;
	injectAnalytics({ mode: dev ? 'development' : 'production' });
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
			<div class="flex items-center gap-4">
				<div class="bevel-button h-full bg-gradient-to-b from-gray-200 to-gray-400 p-4">
					<div class="grid h-full grid-cols-2 gap-4">
						<div class="bevel-inset bg-white p-1">
							<div class="text-center">
								<span class="retro-text-shadow mb-1 block text-xs font-bold text-yellow-600"
									>Welcome!</span
								>
								<div class="flex items-center justify-center gap-1">
									<img src="/gifs/globe.gif" alt="Globe Icon" class="h-6 w-6" />
									<div class="text-xs text-blue-700">
										You are the <span class="blink font-bold text-orange-600"
											>{numberWithOrdinal(data.analytics.totalViews)}</span
										>
										<p>visitor!</p>
									</div>
								</div>
							</div>
						</div>
						<div class="bevel-inset bg-white p-1">
							<div class="text-center">
								<span class="mb-1 block text-xs font-bold text-red-600">Bad Actors</span>
								<div class="flex items-center justify-center gap-1">
									<img src="/gifs/skull.gif" alt="Warning Icon" class="h-8 w-8" />
									<div class="text-xs text-red-700">
										<span class="font-bold text-red-600">{data.analytics.badActors}</span>
										bots/scrapers
										<div>/neerdowells</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col items-start gap-1">
				<HighFiveCounter />
				<UnderConstructionGif />
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
