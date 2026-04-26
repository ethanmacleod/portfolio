import DiscordIcon from '$lib/components/icons/DiscordIcon.svelte';
import GitHubIcon from '$lib/components/icons/GitHubIcon.svelte';
import LinkedInIcon from '$lib/components/icons/LinkedInIcon.svelte';
import InstagramIcon from '$lib/components/icons/InstagramIcon.svelte';
import type { Social, StatusConfig } from '$lib/types';

export const socials: Social[] = [
	{
		href: 'https://discord.com/users/484309345362771981',
		label: 'DISCORD',
		Icon: DiscordIcon,
		color: '#5865F2'
	},
	{
		href: 'https://github.com/ethanmacleod',
		label: 'GITHUB',
		Icon: GitHubIcon,
		color: '#333'
	},
	{
		href: 'https://www.linkedin.com/in/macleod-ethan/',
		label: 'LINKEDIN',
		Icon: LinkedInIcon,
		color: '#0077B5'
	},
	{
		href: 'https://www.instagram.com/ethandavidfrancis',
		label: 'INSTAGRAM',
		Icon: InstagramIcon,
		color: '#E1306C'
	}
];

export const status: StatusConfig = {
	state: 'open',
	label: 'OPEN FOR WORK',
	detail: 'Available for freelance & contract work',
	timezone: 'NZT (UTC+12)',
	response: '~24 hours'
};

export const statusColors: Record<StatusConfig['state'], string> = {
	open: '#22c55e',
	busy: '#eab308',
	away: '#ef4444'
};

export const statusDotClasses: Record<StatusConfig['state'], string> = {
	open: 'bg-green-500',
	busy: 'bg-yellow-500',
	away: 'bg-red-500'
};
