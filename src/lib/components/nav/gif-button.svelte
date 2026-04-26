<script lang="ts">
	import BevelRaised from '$lib/components/ui/BevelRaised.svelte';

	export let href: string;
	export let gifName: string;
	export let alt: string;
</script>

<BevelRaised
	class="block h-[40px] bg-[#d4d0c8] transition-all duration-200 hover:shadow-lg hover:brightness-110"
>
	<a {href} aria-label={alt} class="block h-full w-full">
		<video
			autoplay
			loop
			muted
			playsinline
			aria-hidden="true"
			src={`/gifs/${gifName}.webm`}
			class="block h-full w-full object-fill"
		></video>
	</a>
</BevelRaised>
