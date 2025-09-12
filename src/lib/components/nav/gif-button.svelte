<script lang="ts">
	export let href: string;
	export let gifName: string;
	export let alt: string;
</script>

<a {href} class="block group">
	<img src={`/gifs/${gifName}.gif`} {alt} class="bevel-button h-[40px] w-full transition-all duration-200 group-hover:brightness-110 group-hover:shadow-lg" />
</a>
