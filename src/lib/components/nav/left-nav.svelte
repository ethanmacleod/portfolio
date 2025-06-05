<script>
	import GifButton from './gif-button.svelte';
</script>

<aside class="w-44 border border-solid border-gray-600 bg-[#ffffcb] p-2">
	<nav>
		<ul class="flex flex-col gap-2">
			<li class="my-2"><a href="/" class="underline">Home</a></li>
			<hr class="border-gray-600" />
			<GifButton href="/about" gifName="about-me" alt="About Me" />
			<GifButton href="/projects" gifName="projects" alt="Projects" />
			<li class="my-2"><a href="/contact" class="underline">Contact</a></li>
		</ul>
	</nav>
</aside>
