<script lang="ts">
	import TotalViewsWidget from '../TotalViewsWidget.svelte';
	import BadActorsWidget from '../BadActorsWidget.svelte';
	
	interface Analytics {
		totalViews: number;
		badActors: number;
	}
	
	export let analytics: Analytics;
</script>

<header class="flex items-center justify-between bg-black gap-4 p-2">
	<TotalViewsWidget count={analytics.totalViews} />
	<BadActorsWidget count={analytics.badActors} />
</header>
