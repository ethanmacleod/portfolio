<script lang="ts">
	import { numberWithOrdinal } from '$lib/functions';
	import type { Analytics } from '$lib/types';

	export let analytics: Analytics;
</script>

<div class="bevel-button bg-gradient-to-b from-gray-200 to-gray-400 p-3 h-32 box-border">
	<div class="grid grid-cols-2 gap-3 h-full">
		<div class="bevel-inset bg-white p-1 flex flex-col h-full">
			<div class="text-xs font-bold text-yellow-600">Welcome!</div>
			<div class="flex items-center justify-center gap-2 flex-1">
				<img src="/gifs/globe.gif" alt="Globe Icon" class="h-8 w-8" />
				<div class="text-xs text-blue-700 text-center">
					You are the <span class="blink font-bold text-orange-600"
						>{numberWithOrdinal(analytics.totalViews)}</span
					> visitor!
				</div>
			</div>
		</div>
		<div class="bevel-inset bg-white p-1 flex flex-col h-full">
			<div class="text-xs font-bold text-red-600">Bad Actors</div>
			<div class="flex items-center justify-center gap-2 flex-1">
				<img src="/gifs/skull.gif" alt="Warning Icon" class="h-8 w-8" />
				<div class="text-xs text-red-700 text-center">
					<div class="font-bold text-red-600">{analytics.badActors}</div>
					<div>bots/scrapers</div>
				</div>
			</div>
		</div>
	</div>
</div>
