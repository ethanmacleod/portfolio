<script lang="ts">
	import type { Project } from '$lib/schema.js';
	import ProjectCard from './ProjectCard.svelte';
	import ProjectPagination from './ProjectPagination.svelte';

	interface Props {
		projects: Project[];
		itemsPerPage?: number;
		showPagination?: boolean;
		className?: string;
	}

	let { projects, itemsPerPage = 1, showPagination = true, className = '' }: Props = $props();

	let currentPage = $state(0);

	const totalPages = Math.ceil(projects.length / itemsPerPage);
	const currentProjects = $derived(
		projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
	);

	function nextPage() {
		if (currentPage < totalPages - 1) currentPage++;
	}

	function prevPage() {
		if (currentPage > 0) currentPage--;
	}

	function goToPage(page: number) {
		if (page >= 0 && page < totalPages) currentPage = page;
	}
</script>

<div class="projects-container flex flex-col {className}">
	{#each currentProjects as project (project.id)}
		<ProjectCard {project} />
	{/each}

	{#if showPagination && totalPages > 1}
		<ProjectPagination
			{currentPage}
			{totalPages}
			onPrev={prevPage}
			onNext={nextPage}
			onGoToPage={goToPage}
		/>
	{/if}
</div>
