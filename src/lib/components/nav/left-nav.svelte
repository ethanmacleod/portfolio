<script>
	import GifButton from './gif-button.svelte';
</script>

<nav class="h-full">
	<div
		class="mb-3 rounded border-2 border-cyan-400 bg-gradient-to-r from-blue-900 to-purple-900 p-2 text-center"
	>
		<div class="neon-glow text-sm text-cyan-300">NAVIGATION</div>
	</div>

	<ul class="flex flex-col gap-3">
		<li class="group">
			<a
				href="/"
				class="bevel-button block border-3 bg-[#d4d8d5] transition-all duration-200 hover:bg-[#e4e8e5] hover:shadow-lg"
				><img
					src="https://images.cooltext.com/5732587.gif"
					class="h-[40px] w-full"
					alt="Home Page"
				/></a
			>
		</li>

		<li class="group">
			<GifButton href="/about" gifName="about-me" alt="About Me" />
		</li>

		<li class="group">
			<GifButton href="/projects" gifName="projects" alt="Projects" />
		</li>

		<li class="group">
			<GifButton href="/contact" gifName="contact-me" alt="Contact Me" />
		</li>
	</ul>
</nav>
