<script lang="ts">
	export let src: string;
	export let ariaLabel: string;
</script>

<div class="bevel-inset flex h-full items-center gap-2 bg-white px-2">
	<video autoplay loop muted playsinline aria-label={ariaLabel} {src} class="h-5 w-5 shrink-0"
	></video>
	<div class="text-xs">
		<slot />
	</div>
</div>
