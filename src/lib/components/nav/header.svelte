<script lang="ts">
	import { numberWithOrdinal } from '$lib/functions';
	import RetroDiv from '../RetroDiv.svelte';

	interface Analytics {
		totalViews: number;
		badActors: number;
	}

	export let analytics: Analytics;
</script>

<header class="flex gap-1 bg-black">
	<RetroDiv>
		<span class="retro-text-shadow mb-2 text-left text-sm font-bold text-yellow-400">Welcome!</span>
		<div class="flex items-center gap-2">
			<img src="/gifs/globe.gif" alt="Globe Icon" class="h-8 w-8" />
			<span class="text-sm text-blue-600">
				You are the <span class="blink font-bold text-orange-500"
					>{numberWithOrdinal(analytics.totalViews)}</span
				> visitor!
			</span>
		</div>
	</RetroDiv>

	<RetroDiv>
		<span class="mb-2 text-left text-sm font-bold text-red-400">Bad Actors Count</span>
		<div class="flex items-center gap-2">
			<img src="/gifs/skull.gif" alt="Warning Icon" class="h-12 w-12" />
			<span class="text-sm text-red-600">
				<span class="font-bold text-red-500">{analytics.badActors}</span> bots/scrapers
			</span>
		</div>
	</RetroDiv>
</header>
