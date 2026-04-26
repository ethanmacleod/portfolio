<script lang="ts">
	export let href: string;
	export let gifName: string;
	export let alt: string;
</script>

<a {href} aria-label={alt} class="block group">
	<video autoplay loop muted playsinline aria-hidden="true" src={`/gifs/${gifName}.webm`} class="bevel-button h-[40px] w-full transition-all duration-200 group-hover:brightness-110 group-hover:shadow-lg"></video>
</a>
