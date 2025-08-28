<script lang="ts">
	import HeaderWidget from './HeaderWidget.svelte';
	
	export let count: number;
</script>

<HeaderWidget
	title="Bad Actors Blocked!"
	text="{count} bots/scrapers blocked"
	icon="/gifs/globe.gif"
	iconAlt="Warning Icon"
	textColor="text-red-600"
/>