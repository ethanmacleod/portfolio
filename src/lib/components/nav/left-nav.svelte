<script>
	import GifButton from './gif-button.svelte';
	import DiscordIcon from '../icons/DiscordIcon.svelte';
	import GitHubIcon from '../icons/GitHubIcon.svelte';
	import LinkedInIcon from '../icons/LinkedInIcon.svelte';
	import InstagramIcon from '../icons/InstagramIcon.svelte';
</script>

<nav class="h-full">
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
			<GifButton href="/" gifName="about-me" alt="About Me" />
		</li>

		<li class="group">
			<GifButton href="/projects" gifName="projects" alt="Projects" />
		</li>

		<li class="group">
			<GifButton href="/contact" gifName="contact-me" alt="Contact Me" />
		</li>
	</ul>

	<div class="mt-12 mb-8">
		<div class="mx-2 border-t-2 border-gray-500"></div>
	</div>

	<div class="bevel-inset bg-gradient-to-b from-gray-800 to-gray-900 p-4">
		<div
			class="mb-3 rounded border-2 border-yellow-400 bg-gradient-to-r from-green-900 to-teal-900 p-2 text-center"
		>
			<div class="neon-glow text-sm text-yellow-300">CONNECT</div>
		</div>

		<div class="flex flex-col gap-2">
			<a
				href="https://discord.com/users/484309345362771981"
				target="_blank"
				class="bevel-button group flex h-12 items-center gap-3 bg-[#5865F2] p-2 text-white transition-all duration-200 hover:bg-[#4752C4] hover:shadow-lg"
			>
				<DiscordIcon />
				<div class="flex flex-1 flex-col items-start justify-center">
					<div class="font-mono text-sm font-bold">DISCORD</div>
					<div class="flex items-center gap-1">
						<div class="blink h-2 w-2 rounded-full bg-green-400"></div>
						<div class="text-[10px]">ONLINE</div>
					</div>
				</div>
			</a>

			<a
				href="https://github.com/ethanmacleod"
				target="_blank"
				class="bevel-button group flex h-12 items-center gap-3 bg-[#24292e] p-2 text-white transition-all duration-200 hover:bg-[#1a1e22] hover:shadow-lg"
			>
				<GitHubIcon />
				<div class="flex flex-1 flex-col items-start justify-center">
					<div class="font-mono text-sm font-bold">GITHUB</div>
					<div class="text-[10px] text-green-400">ACTIVE</div>
				</div>
			</a>

			<a
				href="https://www.linkedin.com/in/macleod-ethan/"
				target="_blank"
				class="bevel-button group flex h-12 items-center gap-3 bg-[#0077B5] p-2 text-white transition-all duration-200 hover:bg-[#005885] hover:shadow-lg"
			>
				<LinkedInIcon />
				<div class="flex flex-1 flex-col items-start justify-center">
					<div class="font-mono text-sm font-bold">LINKEDIN</div>
				</div>
			</a>

			<a
				href="https://www.instagram.com/ethandavidfrancis"
				target="_blank"
				class="bevel-button group flex h-12 items-center gap-3 bg-gradient-to-r from-[#E4405F] to-[#833AB4] p-2 text-white transition-all duration-200 hover:shadow-lg"
			>
				<InstagramIcon />
				<div class="flex flex-1 flex-col items-start justify-center">
					<div class="font-mono text-sm font-bold">INSTAGRAM</div>
				</div>
			</a>
		</div>
	</div>
</nav>
