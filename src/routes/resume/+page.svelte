<script lang="ts">
	import RetroDiv from '$lib/components/RetroDiv.svelte';

	const resumePath = '/resume.pdf';
</script>

<svelte:head>
	<title>Resume - Ethan MacLeod</title>
	<meta name="description" content="My resume and professional background" />
	<meta property="og:title" content="Resume - Ethan MacLeod" />
	<meta property="og:description" content="My resume and professional background" />
</svelte:head>

<div class="flex h-full min-h-0 flex-col gap-3">
	<RetroDiv width="w-full" className="shrink-0 p-3">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="font-mono text-base font-bold text-blue-700">// RESUME.PDF</h1>
				<p class="mt-1 font-mono text-xs text-gray-600">Ethan MacLeod - Software Developer</p>
			</div>
			<a
				href={resumePath}
				download
				class="bevel-button bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-mono text-xs font-bold text-white transition-opacity hover:opacity-90"
			>
				DOWNLOAD
			</a>
		</div>
	</RetroDiv>

	<RetroDiv width="w-full" className="flex-1 overflow-hidden">
		<iframe src={resumePath} title="Resume" class="h-full w-full" style="border: none;"></iframe>
	</RetroDiv>
</div>
