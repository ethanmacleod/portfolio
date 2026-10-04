import { GitHubIcon, LinkedInIcon } from '~/lib/components/icons';
import type { Social } from '~/lib/types';

export const socials: Social[] = [
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
	}
];

export const availability = 'Taking on freelance and contract work.';
