<script lang="ts">
	import { numberWithOrdinal } from '$lib/functions';
	import type { Analytics } from '$lib/schema.js';
	import HeaderWidget from './HeaderWidget.svelte';
	import LiveClock from './LiveClock.svelte';

	export let analytics: Analytics;
</script>

<div class="box-border h-full p-3">
	<div class="grid h-full grid-cols-3 gap-3">
		<HeaderWidget src="/gifs/globe.webm" ariaLabel="Globe Icon">
			<span class="text-blue-700"
				>You are the <span class="blink font-bold text-orange-600"
					>{numberWithOrdinal(analytics.totalViews)}</span
				> visitor!</span
			>
		</HeaderWidget>
		<HeaderWidget src="/gifs/skull.webm" ariaLabel="Warning Icon">
			<span class="text-red-700"
				><span class="font-bold text-red-600">{analytics.badActors}</span> bots/scrapers</span
			>
		</HeaderWidget>
		<LiveClock />
	</div>
</div>
