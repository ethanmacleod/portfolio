<script lang="ts">
	import AboutMe from '$lib/components/AboutMe.svelte';
	import Guestbook from '$lib/components/Guestbook.svelte';
</script>

<svelte:head>
	<title>Welcome to my Homepage!</title>
</svelte:head>

<div class="space-y-6">
	<AboutMe />

	<Guestbook />
</div>