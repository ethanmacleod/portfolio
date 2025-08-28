<script lang="ts">
	export let href: string;
	export let gifName: string;
	export let alt: string;
</script>

<a {href}>
	<img src={`/gifs/${gifName}.gif`} {alt} class="bevel-button h-[40px] w-full" />
</a>
