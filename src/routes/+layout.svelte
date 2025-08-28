<script lang="ts">
	import Header from '$lib/components/nav/header.svelte';
	import LeftNav from '$lib/components/nav/left-nav.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
</script>

<div class="grid min-h-screen grid-cols-[220px_1fr] grid-rows-[auto_1fr_auto] font-serif">
	<aside class="row-span-2 border-4 border-gray-600 bg-gray-800 text-white">
		<LeftNav />
	</aside>

	<header class="border-4 border-gray-600 bg-black text-white">
		<Header analytics={data.analytics} />
	</header>

	<main class="overflow-auto border-4 border-gray-600">
		<slot />
	</main>

	<footer class="col-span-2 border-4 border-gray-600 bg-gray-900 p-4 text-center text-white">
		Footer content
	</footer>
</div>
