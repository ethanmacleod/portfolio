import type { Section } from '$lib/types';

export const sections: Section[] = [
	{
		title: 'DESKTOP PC',
		icon: '🖥',
		items: [
			{ label: 'CPU', value: 'AMD Ryzen 9 5900X' },
			{ label: 'GPU', value: 'NVIDIA RTX 3080' },
			{ label: 'RAM', value: '32GB DDR4 3600MHz' },
			{ label: 'Storage', value: '2TB NVMe SSD + 4TB HDD' },
			{ label: 'OS', value: 'Arch Linux / Windows 11' },
			{ label: 'Case', value: 'Lian Li PC-O11 Dynamic' }
		]
	},
	{
		title: 'LAPTOP',
		icon: '💻',
		items: [
			{ label: 'Model', value: 'Lenovo ThinkPad T15 Gen 2i' },
			{ label: 'CPU', value: 'Intel Core i5-1135G7 @ 4.20 GHz' },
			{ label: 'GPU', value: 'Intel Iris Xe (integrated)' },
			{ label: 'RAM', value: '16GB DDR4' },
			{ label: 'Storage', value: '256GB SSD (btrfs)' },
			{ label: 'Display', value: '15.6" FHD 1080p 60Hz' },
			{ label: 'OS', value: 'Arch Linux' }
		]
	},
	{
		title: 'PERIPHERALS',
		icon: '⌨',
		items: [
			{ label: 'Monitor 1', value: 'MSI Optix G27C4 27" Curved 165Hz' },
			{ label: 'Monitor 2', value: 'MSI PRO MP241 24" FHD' },
			{ label: 'Keyboard', value: 'Keychron C2 Full Size (Retro)' },
			{ label: 'Mouse', value: 'Logitech G502 Hero' },
			{ label: 'Headset', value: 'Corsair Gaming Headset' },
			{ label: 'Webcam', value: 'Just my laptop webcam :(' },
			{ label: 'Desk', value: 'Kmart one B)' }
		]
	},
	{
		title: 'DEV STACK',
		icon: '⚙',
		items: [
			{ label: 'Languages', value: 'TypeScript, Python, Go' },
			{ label: 'Frontend', value: 'SvelteKit, React, Next.js' },
			{ label: 'Backend', value: 'tRPC, Django, FastAPI' },
			{ label: 'Database', value: 'PostgreSQL, Redis' },
			{ label: 'Infra', value: 'Docker, Terraform, AWS' },
			{ label: 'Editor', value: 'Neovim / VS Code' }
		]
	},
	{
		title: 'SOFTWARE',
		icon: '📦',
		items: [
			{ label: 'Terminal', value: 'WezTerm + Zsh + Starship' },
			{ label: 'Browser', value: 'Firefox (dev) / Arc' },
			{ label: 'Notes', value: 'Obsidian' },
			{ label: 'Git UI', value: 'Lazygit' },
			{ label: 'Design', value: 'Figma' },
			{ label: 'AI', value: 'Claude Code, Cursor' }
		]
	},
	{
		title: 'MISC',
		icon: '✦',
		items: [
			{ label: 'Location', value: 'New Zealand' },
			{ label: 'Camera', value: 'Canon EOS 650' },
			{ label: 'Hobby', value: 'Mechanical keyboards, hiking' },
			{ label: 'Currently reading', value: 'The Pragmatic Programmer' },
			{ label: 'Currently playing', value: 'Insert game here' },
			{ label: 'Music', value: 'Lo-fi, post-rock, metal' }
		]
	}
];
