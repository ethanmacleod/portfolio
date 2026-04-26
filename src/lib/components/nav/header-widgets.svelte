<script lang="ts">
	import { numberWithOrdinal } from '$lib/functions';
	import type { Analytics } from '$lib/schema.js';

	export let analytics: Analytics;
</script>

<div class="bevel-button box-border h-32 bg-gradient-to-b from-gray-200 to-gray-400 p-3">
	<div class="grid h-full grid-cols-2 gap-3">
		<div class="bevel-inset flex h-full flex-col bg-white p-1">
			<div class="text-xs font-bold text-yellow-600">Welcome!</div>
			<div class="flex flex-1 items-center justify-center gap-2">
				<video
					autoplay
					loop
					muted
					playsinline
					aria-label="Globe Icon"
					src="/gifs/globe.webm"
					class="h-8 w-8"
				></video>
				<div class="text-center text-xs text-blue-700">
					You are the <span class="blink font-bold text-orange-600"
						>{numberWithOrdinal(analytics.totalViews)}</span
					> visitor!
				</div>
			</div>
		</div>
		<div class="bevel-inset flex h-full flex-col bg-white p-1">
			<div class="text-xs font-bold text-red-600">Bad Actors</div>
			<div class="flex flex-1 items-center justify-center gap-2">
				<video
					autoplay
					loop
					muted
					playsinline
					aria-label="Warning Icon"
					src="/gifs/skull.webm"
					class="h-8 w-8"
				></video>
				<div class="text-center text-xs text-red-700">
					<div class="font-bold text-red-600">{analytics.badActors}</div>
					<div>bots/scrapers</div>
				</div>
			</div>
		</div>
	</div>
</div>
