<script>
	import GifButton from './gif-button.svelte';
</script>

<aside class="border border-solid border-gray-600 bg-zinc-950 p-4">
	<nav>
		<ul class="flex flex-col gap-2">
			<a href="/" class="bevel-button border-3 bg-[#d4d8d5]"
				><img
					src="https://images.cooltext.com/5732587.gif"
					class="h-[40px] w-full"
					alt="Home Page"
				/></a
			>
			<GifButton href="/about" gifName="about-me" alt="About Me" />
			<GifButton href="/projects" gifName="projects" alt="Projects" />
			<GifButton href="/contact" gifName="contact-me" alt="Contact Me" />
		</ul>
	</nav>
</aside>
