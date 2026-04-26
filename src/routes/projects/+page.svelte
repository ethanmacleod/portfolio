<script lang="ts">
	import Projects from '$lib/components/Projects.svelte';
	import { projects } from '$lib/config/projects';
</script>

<svelte:head>
	<title>Projects - Ethan MacLeod</title>
	<meta name="description" content="Explore my latest projects and development work" />
</svelte:head>

<Projects {projects} itemsPerPage={1} showPagination={true} className="h-full" />
