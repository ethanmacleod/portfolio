<script lang="ts">
	import AboutMe from '$lib/components/AboutMe.svelte';
	import Guestbook from '$lib/components/Guestbook.svelte';

	export let data;
</script>

<svelte:head>
	<title>Ethan MacLeod - Software Developer</title>
	<meta
		name="description"
		content="NZ-based software developer. Personal portfolio showcasing projects, homelab, and more."
	/>
	<meta property="og:title" content="Ethan MacLeod - Software Developer" />
	<meta
		property="og:description"
		content="NZ-based software developer. Personal portfolio showcasing projects, homelab, and more."
	/>
</svelte:head>

<div class="space-y-6">
	<AboutMe />
	<Guestbook {data} />
</div>
