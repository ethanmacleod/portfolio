<script lang="ts">
	import HeaderWidget from './HeaderWidget.svelte';

	export let count: number;
</script>

<HeaderWidget
	title="Welcome!"
	text="You are visitor #{count}!"
	icon="/gifs/globe.gif"
	iconAlt="Globe Icon"
	textColor="text-blue-600"
/>
