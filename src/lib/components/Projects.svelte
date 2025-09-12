<script lang="ts">
	import SkillBlock from './SkillBlock.svelte';
	import RetroDiv from './RetroDiv.svelte';
	import GitHubIcon from './icons/GitHubIcon.svelte';

	interface Project {
		id: string;
		title: string;
		description: string;
		longDescription?: string;
		githubUrl: string;
		technologies: Array<{
			name: string;
			icon?: string;
			brandColor?: string;
		}>;
		images: Array<{
			url: string;
			caption?: string;
			alt: string;
		}>;
		status: 'active' | 'completed' | 'archived';
		featured?: boolean;
		demoUrl?: string;
		startDate?: string;
		endDate?: string;
	}

	interface Props {
		projects: Project[];
		itemsPerPage?: number;
		showPagination?: boolean;
		className?: string;
	}

	let { projects, itemsPerPage = 1, showPagination = true, className = '' }: Props = $props();

	let currentPage = $state(0);
	let selectedImageIndex = $state(0);

	const totalPages = Math.ceil(projects.length / itemsPerPage);
	const currentProjects = $derived(
		projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
	);

	function nextPage() {
		if (currentPage < totalPages - 1) {
			currentPage++;
			selectedImageIndex = 0;
		}
	}

	function prevPage() {
		if (currentPage > 0) {
			currentPage--;
			selectedImageIndex = 0;
		}
	}

	function goToPage(page: number) {
		if (page >= 0 && page < totalPages) {
			currentPage = page;
			selectedImageIndex = 0;
		}
	}

	function selectImage(index: number) {
		selectedImageIndex = index;
	}

	function nextImage(project: Project) {
		if (selectedImageIndex < project.images.length - 1) {
			selectedImageIndex++;
		} else {
			selectedImageIndex = 0;
		}
	}

	function prevImage(project: Project) {
		if (selectedImageIndex > 0) {
			selectedImageIndex--;
		} else {
			selectedImageIndex = project.images.length - 1;
		}
	}
</script>

<div class="projects-container flex flex-col {className}">
	{#if currentProjects.length === 0}
		<RetroDiv width="w-full" className="flex-1 flex items-center justify-center">
			<div class="p-8 text-center">
				<div class="mb-4 text-6xl">🚧</div>
				<h2 class="mb-2 text-xl font-bold text-gray-700">No Projects Found</h2>
				<p class="text-gray-600">Check back soon for awesome projects!</p>
			</div>
		</RetroDiv>
	{:else}
		{#each currentProjects as project, projectIndex (project.id)}
			<div class="project-card flex min-h-0 flex-1 flex-col">
				<RetroDiv width="w-full" className="mb-3">
					<div class="bg-gradient-to-r from-blue-600 to-purple-600 p-2">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<h1 class="retro-text-shadow text-lg font-bold text-white">
									{project.title}
								</h1>
								{#if project.featured}
									<div class="flex items-center gap-2 text-xs">
										<span
											class="bg-opacity-80 rounded bg-yellow-400 px-2 py-0.5 font-mono text-xs text-yellow-900"
										>
											⭐ FEATURED
										</span>
									</div>
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

				<div class="flex flex-col gap-4 lg:flex-row">
					<div class="flex-1">
						{#if project.images.length > 0}
							<RetroDiv width="w-full" className="mb-4 flex-shrink-0">
								<div class="p-3">
									<div class="bevel-inset relative mb-2 aspect-video overflow-hidden bg-gray-200">
										<img
											src={project.images[selectedImageIndex].url}
											alt={project.images[selectedImageIndex].alt}
											class="h-full w-full object-contain"
										/>
										{#if project.images.length > 1}
											<button
												onclick={() => prevImage(project)}
												class="bevel-button bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 transition-all duration-200"
											>
												<span class="font-bold text-gray-700">‹</span>
											</button>
											<button
												onclick={() => nextImage(project)}
												class="bevel-button bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 transition-all duration-200"
											>
												<span class="font-bold text-gray-700">›</span>
											</button>
										{/if}
									</div>

									{#if project.images.length > 1}
										<div class="mb-2 flex justify-center gap-1">
											{#each project.images as image, index}
												<button
													aria-label="select-image"
													onclick={() => selectImage(index)}
													class="h-3 w-3 rounded-full border-2 transition-colors duration-200"
													class:bg-blue-500={index === selectedImageIndex}
													class:border-blue-500={index === selectedImageIndex}
													class:bg-gray-300={index !== selectedImageIndex}
													class:border-gray-300={index !== selectedImageIndex}
												></button>
											{/each}
										</div>
									{/if}
								</div>
							</RetroDiv>
						{/if}
					</div>

					<div class="flex h-96 flex-col gap-3 lg:w-96">
						<RetroDiv width="w-full" className="flex-1">
							<div class="flex h-full flex-col p-2">
								<h3 class="mb-2 text-center text-sm font-bold text-blue-700">Tech Stack</h3>
								<div class="bevel-inset flex-1 overflow-auto bg-gray-50 p-2">
									<div class="grid grid-cols-2 place-items-center gap-1">
										{#each project.technologies as tech, index}
											<SkillBlock
												name={tech.name}
												label=""
												icon={tech.icon}
												brandColor={tech.brandColor || '#9333ea'}
												{index}
											/>
										{/each}
									</div>
								</div>
							</div>
						</RetroDiv>

						<RetroDiv width="w-full" className="flex-1">
							<div class="flex h-full flex-col p-2">
								<h3 class="mb-2 text-sm font-bold text-blue-700">Description</h3>
								<div class="bevel-inset flex-1 overflow-auto bg-gray-50 p-2">
									<p class="mb-2 text-sm text-gray-700">{project.description}</p>
									{#if project.longDescription}
										<p class="mb-2 text-xs text-gray-600">{project.longDescription}</p>
									{/if}

									{#if project.demoUrl}
										<a
											href={project.demoUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="bevel-button inline-block bg-gradient-to-r from-green-500 to-blue-500 px-3 py-1 text-xs text-white transition-all duration-200 hover:from-green-600 hover:to-blue-600"
										>
											🚀 View Demo
										</a>
									{/if}
								</div>
							</div>
						</RetroDiv>
					</div>
				</div>
			</div>
		{/each}
	{/if}

	{#if showPagination && totalPages > 1}
		<div class="mt-2">
			<RetroDiv width="w-full">
				<div class="px-3 py-1">
					<div class="flex items-center justify-between">
						<button
							onclick={prevPage}
							disabled={currentPage === 0}
							class="bevel-button bg-gray-200 px-2 py-0.5 text-xs transition-all duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
						>
							‹
						</button>

						<div class="flex items-center gap-1">
							{#each Array(totalPages) as _, index}
								<button
									onclick={() => goToPage(index)}
									class="bevel-button px-2 py-1 text-xs font-bold transition-all duration-200"
									class:bg-gradient-to-br={index === currentPage}
									class:from-blue-500={index === currentPage}
									class:to-purple-600={index === currentPage}
									class:text-white={index === currentPage}
									class:bg-gray-200={index !== currentPage}
									class:hover:bg-gray-300={index !== currentPage}
									class:text-gray-700={index !== currentPage}
								>
									{index + 1}
								</button>
							{/each}
						</div>

						<button
							onclick={nextPage}
							disabled={currentPage === totalPages - 1}
							class="bevel-button bg-gray-200 px-2 py-0.5 text-xs transition-all duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
						>
							›
						</button>
					</div>
					<div class="text-center font-mono text-xs leading-none text-gray-500">
						{currentPage + 1}/{totalPages}
					</div>
				</div>
			</RetroDiv>
		</div>
	{/if}
</div>

<style>
	.project-card {
		overflow: hidden;
	}
</style>
