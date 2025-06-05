<script lang="ts">
	export let href: string;
	export let gifName: string;
	export let alt: string;
</script>

<a {href}>
	<img
		src={`/gifs/${gifName}.gif`}
		{alt}
		class="h-[40px] w-full border-3 border-t-gray-200 border-r-gray-500 border-b-gray-500 border-l-gray-300"
	/>
</a>
