<script lang="ts">
	import type { Analytics } from '$lib/schema.js';
	import DynamicHeader from '../DynamicHeader.svelte';
	import HighFiveCounter from '../HighFiveCounter.svelte';
	import UnderConstructionGif from '../UnderConstructionGif.svelte';
	import HeaderWidgets from './header-widgets.svelte';

	export let analytics: Analytics;
</script>

<header
	class="bevel-button box-border flex h-20 shrink-0 gap-1 overflow-hidden p-1 pr-2"
	style="background: linear-gradient(180deg, #dce2e8 0%, #8e96a0 100%);"
>
	<div class="w-[45%] shrink-0">
		<HeaderWidgets {analytics} />
	</div>

	<div
		class="bevel-inset my-1 flex w-[25%] shrink-0 flex-col gap-1 overflow-hidden bg-[#c0c0c0] p-1"
	>
		<div class="flex min-h-0 flex-1 gap-1">
			<div class="min-w-0 flex-1 overflow-hidden">
				<HighFiveCounter />
			</div>
			<div class="min-w-0 flex-1 overflow-hidden">
				<video
					autoplay
					loop
					muted
					playsinline
					aria-hidden="true"
					src="/gifs/rainbow.webm"
					class="h-full w-full"
					style="object-fit: cover;"
				></video>
			</div>
		</div>
		<div class="min-h-0 flex-1 overflow-hidden">
			<UnderConstructionGif />
		</div>
	</div>

	<div class="bevel-inset my-1 w-[30%] shrink-0 overflow-hidden">
		<DynamicHeader />
	</div>
</header>
