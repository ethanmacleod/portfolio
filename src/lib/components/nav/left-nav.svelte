<script>
	import GifButton from './gif-button.svelte';
</script>

<aside class="w-44 border border-solid border-gray-600 bg-[#ffffcb] p-2">
	<nav>
		<ul class="flex flex-col gap-2">
			<a
				href="/"
				class="border-3 border-t-gray-200 border-r-gray-500 border-b-gray-500 border-l-gray-300 bg-[#d4d8d5]"
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
