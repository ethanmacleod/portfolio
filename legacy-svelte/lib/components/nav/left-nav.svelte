<script>
	import BevelRaised from '$lib/components/ui/BevelRaised.svelte';
	import GifButton from './gif-button.svelte';
	import DiscordIcon from '../icons/DiscordIcon.svelte';
	import GitHubIcon from '../icons/GitHubIcon.svelte';
	import LinkedInIcon from '../icons/LinkedInIcon.svelte';
	import InstagramIcon from '../icons/InstagramIcon.svelte';
</script>

<nav class="flex h-full flex-col">
	<ul class="flex flex-col gap-2">
		<li>
			<BevelRaised
				class="block h-[40px] bg-[#d4d0c8] transition-all duration-200 hover:shadow-lg hover:brightness-110"
			>
				<a href="/" aria-label="Home" class="block h-full w-full">
					<img
						src="https://images.cooltext.com/5732587.gif"
						class="block h-full w-full object-contain"
						alt="Home Page"
					/>
				</a>
			</BevelRaised>
		</li>

		<li>
			<GifButton href="/projects" gifName="projects" alt="Projects" />
		</li>

		<li>
			<GifButton href="/contact" gifName="contact-me" alt="Contact Me" />
		</li>

		<li>
			<GifButton href="/resume" gifName="resume" alt="Resume" />
		</li>

		<li>
			<GifButton href="/uses" gifName="uses" alt="Uses" />
		</li>

		<li>
			<GifButton href="/homelab" gifName="homelab" alt="Homelab" />
		</li>

		<li>
			<GifButton href="/boids" gifName="boids" alt="Boids" />
		</li>
	</ul>

	<div class="my-4 px-1">
		<div class="border-t border-[#808080]"></div>
		<div class="border-t border-white"></div>
	</div>

	<div class="flex-1"></div>

	<ul class="flex flex-col gap-1">
		<li>
			<BevelRaised class="bg-[#d4d0c8] transition-all duration-150 hover:bg-[#e4e0d8]">
				<a
					href="https://discord.com/users/484309345362771981"
					target="_blank"
					class="flex h-8 w-full items-center gap-2 px-2 font-mono text-xs font-bold text-black"
				>
					<DiscordIcon className="h-4 w-4 flex-shrink-0 fill-current" />
					DISCORD
				</a>
			</BevelRaised>
		</li>
		<li>
			<BevelRaised class="bg-[#d4d0c8] transition-all duration-150 hover:bg-[#e4e0d8]">
				<a
					href="https://github.com/ethanmacleod"
					target="_blank"
					class="flex h-8 w-full items-center gap-2 px-2 font-mono text-xs font-bold text-black"
				>
					<GitHubIcon className="h-4 w-4 flex-shrink-0 fill-current" />
					GITHUB
				</a>
			</BevelRaised>
		</li>
		<li>
			<BevelRaised class="bg-[#d4d0c8] transition-all duration-150 hover:bg-[#e4e0d8]">
				<a
					href="https://www.linkedin.com/in/macleod-ethan/"
					target="_blank"
					class="flex h-8 w-full items-center gap-2 px-2 font-mono text-xs font-bold text-black"
				>
					<LinkedInIcon className="h-4 w-4 flex-shrink-0 fill-current" />
					LINKEDIN
				</a>
			</BevelRaised>
		</li>
		<li>
			<BevelRaised class="bg-[#d4d0c8] transition-all duration-150 hover:bg-[#e4e0d8]">
				<a
					href="https://www.instagram.com/ethandavidfrancis"
					target="_blank"
					class="flex h-8 w-full items-center gap-2 px-2 font-mono text-xs font-bold text-black"
				>
					<InstagramIcon className="h-4 w-4 flex-shrink-0 fill-current" />
					INSTAGRAM
				</a>
			</BevelRaised>
		</li>
	</ul>
</nav>
