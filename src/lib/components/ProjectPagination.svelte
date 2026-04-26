<script lang="ts">
	interface Props {
		currentPage: number;
		totalPages: number;
		onPrev: () => void;
		onNext: () => void;
		onGoToPage: (page: number) => void;
	}

	let { currentPage, totalPages, onPrev, onNext, onGoToPage }: Props = $props();
</script>

<div class="mt-2">
	<div class="bevel-button flex flex-col border-5 w-full bg-[#d4d4d4] px-4 py-2 font-[Verdana] text-[13px] leading-tight text-black">
		<div class="px-3 py-1">
			<div class="flex items-center justify-between">
				<button
					onclick={onPrev}
					disabled={currentPage === 0}
					class="bevel-button bg-gray-200 px-2 py-0.5 text-xs transition-all duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
				>
					‹
				</button>

				<div class="flex items-center gap-1">
					{#each Array(totalPages) as _, index}
						<button
							onclick={() => onGoToPage(index)}
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
					onclick={onNext}
					disabled={currentPage === totalPages - 1}
					class="bevel-button bg-gray-200 px-2 py-0.5 text-xs transition-all duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
				>
					›
				</button>
			</div>
			<div class="mt-2 text-center font-mono text-xs leading-none text-gray-500">
				{currentPage + 1}/{totalPages}
			</div>
		</div>
	</div>
</div>
