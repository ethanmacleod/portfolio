<script>
	import GifButton from './gif-button.svelte';
	import DiscordIcon from '../icons/DiscordIcon.svelte';
	import GitHubIcon from '../icons/GitHubIcon.svelte';
	import LinkedInIcon from '../icons/LinkedInIcon.svelte';
	import InstagramIcon from '../icons/InstagramIcon.svelte';
</script>

<nav class="flex h-full flex-col">
	<ul class="flex flex-col gap-2">
		<li>
			<a
				href="/"
				class="bevel-button block border-3 bg-[#d4d0c8] transition-all duration-200 hover:bg-[#e4e0d8]"
			>
				<img
					src="https://images.cooltext.com/5732587.gif"
					class="h-[40px] w-full"
					alt="Home Page"
				/>
			</a>
		</li>

		<li>
			<GifButton href="/" gifName="about-me" alt="About Me" />
		</li>

		<li>
			<GifButton href="/projects" gifName="projects" alt="Projects" />
		</li>

		<li>
			<GifButton href="/contact" gifName="contact-me" alt="Contact Me" />
		</li>
	</ul>

	<div class="my-4 px-1">
		<div class="border-t border-[#808080]"></div>
		<div class="border-t border-white"></div>
	</div>

	<div class="flex-1"></div>

	<ul class="flex flex-col gap-1">
		<li>
			<a
				href="https://discord.com/users/484309345362771981"
				target="_blank"
				class="bevel-button flex h-8 w-full items-center gap-2 bg-[#d4d0c8] px-2 font-mono text-xs font-bold text-black transition-all duration-150 hover:bg-[#e4e0d8] active:border-t-[#6b7280] active:border-r-[#e5e7eb] active:border-b-[#e5e7eb] active:border-l-[#6b7280]"
			>
				<DiscordIcon className="h-4 w-4 flex-shrink-0 fill-current" />
				DISCORD
			</a>
		</li>
		<li>
			<a
				href="https://github.com/ethanmacleod"
				target="_blank"
				class="bevel-button flex h-8 w-full items-center gap-2 bg-[#d4d0c8] px-2 font-mono text-xs font-bold text-black transition-all duration-150 hover:bg-[#e4e0d8]"
			>
				<GitHubIcon className="h-4 w-4 flex-shrink-0 fill-current" />
				GITHUB
			</a>
		</li>
		<li>
			<a
				href="https://www.linkedin.com/in/macleod-ethan/"
				target="_blank"
				class="bevel-button flex h-8 w-full items-center gap-2 bg-[#d4d0c8] px-2 font-mono text-xs font-bold text-black transition-all duration-150 hover:bg-[#e4e0d8]"
			>
				<LinkedInIcon className="h-4 w-4 flex-shrink-0 fill-current" />
				LINKEDIN
			</a>
		</li>
		<li>
			<a
				href="https://www.instagram.com/ethandavidfrancis"
				target="_blank"
				class="bevel-button flex h-8 w-full items-center gap-2 bg-[#d4d0c8] px-2 font-mono text-xs font-bold text-black transition-all duration-150 hover:bg-[#e4e0d8]"
			>
				<InstagramIcon className="h-4 w-4 flex-shrink-0 fill-current" />
				INSTAGRAM
			</a>
		</li>
	</ul>
</nav>
