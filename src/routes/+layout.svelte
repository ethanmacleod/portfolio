<script lang="ts">
	import { page } from '$app/state';
	import LeftNav from '$lib/components/nav/left-nav.svelte';
	import '../app.css';
</script>

<!--
  We switched m-8 → p-8 so that the element
  with min-h-screen doesn’t overflow the viewport.
-->
<div class="flex min-h-screen flex-col border-2 border-solid border-gray-400 p-8 font-serif">
	<!-- Header -->
	<header class="mb-8">
		<center>
			<h1 class="blink text-5xl">{page.data.title || 'Welcome'}</h1>
			<hr class="mx-auto w-[80%]" />
		</center>
	</header>

	<!-- Page content -->
	<main class="flex-1">
		<div class="flex h-full gap-8">
			<LeftNav />

			<!-- Content slot -->
			<section class="flex-1 overflow-auto">
				<slot />
			</section>

			<!-- Widgets -->
			<aside class="w-60 border-l-2 border-solid border-gray-400 p-2">
				<h3 class="mb-2 text-xl">Widgets</h3>
				<ul class="space-y-1">
					<li><a href="#" class="underline">Widget Link 1</a></li>
					<li><a href="#" class="underline">Widget Link 2</a></li>
				</ul>
			</aside>
		</div>
	</main>

	<!-- Footer -->
	<footer class="mt-4 p-2 text-center text-sm">
		<hr class="my-2" />
		<p><em>Last updated: May 24 2025</em></p>
		<p><a href="/" class="underline">Return to top</a></p>
	</footer>
</div>
