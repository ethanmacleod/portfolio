import { DiscordIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from '~/lib/components/icons';
import type { Social } from '~/lib/types';

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

export const availability = 'Taking on freelance and contract work.';
