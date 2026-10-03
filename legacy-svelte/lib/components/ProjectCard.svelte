<script lang="ts">
	import type { Project } from '$lib/schema.js';
	import RetroDiv from './RetroDiv.svelte';
	import SkillBlock from './SkillBlock.svelte';
	import GitHubIcon from './icons/GitHubIcon.svelte';
	import ProjectImageGallery from './ProjectImageGallery.svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<div class="project-card flex min-h-0 flex-1 flex-col overflow-hidden">
	<RetroDiv width="w-full" className="mb-3 shrink-0">
		<div class="bg-gradient-to-r from-blue-600 to-purple-600 p-2">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<h1 class="retro-text-shadow text-lg font-bold text-white">{project.title}</h1>
					{#if project.featured}
						<span
							class="bg-opacity-80 rounded bg-yellow-400 px-2 py-0.5 font-mono text-xs text-yellow-900"
						>
							⭐ FEATURED
						</span>
					{/if}
				</div>
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="bevel-button flex items-center gap-2 bg-gray-700 px-3 py-1.5 transition-colors duration-200 hover:bg-gray-600"
					title="View on GitHub"
				>
					<GitHubIcon className="w-4 h-4 fill-white" />
					<span class="font-mono text-xs text-white">See the codebase here</span>
				</a>
			</div>
		</div>
	</RetroDiv>

	<div class="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
		<div class="flex-1 overflow-hidden">
			{#if project.images.length > 0}
				<RetroDiv width="w-full" className="h-full flex-shrink-0">
					<ProjectImageGallery images={project.images} />
				</RetroDiv>
			{/if}
		</div>

		<div class="flex h-full flex-col gap-3 lg:w-96">
			<RetroDiv width="w-full" className="flex-1 overflow-auto p-2">
				<h3 class="mb-2 text-center text-sm font-bold text-blue-700">Tech Stack</h3>
				<div class="grid grid-cols-2 place-items-center gap-1">
					{#each project.technologies as tech, index (tech.name)}
						<SkillBlock
							name={tech.name}
							label=""
							icon={tech.icon}
							brandColor={tech.brandColor || '#9333ea'}
							{index}
						/>
					{/each}
				</div>
			</RetroDiv>

			<RetroDiv width="w-full" className="flex-1 overflow-auto p-2">
				<h3 class="mb-2 text-sm font-bold text-blue-700">Description</h3>
				<p class="mb-2 text-sm text-gray-700">{project.description}</p>
				{#if project.longDescription}
					<p class="mb-2 text-xs text-gray-600">{project.longDescription}</p>
				{/if}
			</RetroDiv>
		</div>
	</div>
</div>
