<script lang="ts">
	export let href: string;
	export let gifName: string;
	export let alt: string;
</script>

<a {href} aria-label={alt} class="group block">
	<video
		autoplay
		loop
		muted
		playsinline
		aria-hidden="true"
		src={`/gifs/${gifName}.webm`}
		class="bevel-button block h-[40px] w-full object-fill transition-all duration-200 group-hover:shadow-lg group-hover:brightness-110"
	></video>
</a>
