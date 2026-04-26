<script lang="ts">
	interface Image {
		url: string;
		alt: string;
		caption?: string;
	}

	interface Props {
		images: Image[];
	}

	let { images }: Props = $props();

	let selectedIndex = $state(0);

	function next() {
		selectedIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
	}

	function prev() {
		selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
	}

	function select(index: number) {
		selectedIndex = index;
	}
</script>

<div class="flex h-full flex-col p-3">
	<div class="relative mb-2 min-h-0 flex-1 overflow-hidden bg-gray-200">
		<img
			src={images[selectedIndex].url}
			alt={images[selectedIndex].alt}
			class="h-full w-full object-contain"
		/>
		{#if images.length > 1}
			<button
				onclick={prev}
				class="bevel-button bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 transition-all duration-200"
			>
				<span class="font-bold text-gray-700">‹</span>
			</button>
			<button
				onclick={next}
				class="bevel-button bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 transition-all duration-200"
			>
				<span class="font-bold text-gray-700">›</span>
			</button>
		{/if}
	</div>

	{#if images.length > 1}
		<div class="flex shrink-0 justify-center gap-1 pb-1">
			{#each images as image, index (image.url)}
				<button
					aria-label="select-image"
					onclick={() => select(index)}
					class="h-3 w-3 rounded-full border-2 transition-colors duration-200"
					class:bg-blue-500={index === selectedIndex}
					class:border-blue-500={index === selectedIndex}
					class:bg-white={index !== selectedIndex}
					class:border-white={index !== selectedIndex}
				></button>
			{/each}
		</div>
	{/if}
</div>
