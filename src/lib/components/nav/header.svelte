<script lang="ts">
	import HeaderWidget from '../HeaderWidget.svelte';

	interface Analytics {
		totalViews: number;
		badActors: number;
	}

	export let analytics: Analytics;
</script>

<header class="flex gap-4 bg-black p-2">
	<HeaderWidget
		title="Welcome!"
		text="You are visitor #{analytics.totalViews}!"
		icon="/gifs/globe.gif"
		iconAlt="Globe Icon"
		textColor="text-blue-600"
	/>
	<HeaderWidget
		title="Bad Actors Blocked!"
		text="{analytics.badActors} bots/scrapers blocked"
		icon="/gifs/globe.gif"
		iconAlt="Warning Icon"
		textColor="text-red-600"
	/>
</header>
