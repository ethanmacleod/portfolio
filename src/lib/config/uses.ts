import type { Section } from '$lib/types';
import { Monitor, Laptop, Keyboard, Terminal, Package, Sparkles } from 'lucide-svelte';

export const sections: Section[] = [
	{
		title: 'DESKTOP PC',
		Icon: Monitor,
		items: [
			{ label: 'CPU', value: 'AMD Ryzen 5 3600' },
			{ label: 'GPU', value: 'AMD Radeon RX 580' },
			{ label: 'RAM', value: '32GB DDR4 3600MHz' },
			{ label: 'Storage', value: '2TB NVMe SSD + 4TB HDD' },
			{ label: 'OS', value: 'Ubuntu / Windows 11' },
			{ label: 'Motherboard', value: 'Asrock B450 Steel Legend' }
		]
	},
	{
		title: 'LAPTOP',
		Icon: Laptop,
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
		Icon: Keyboard,
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
		Icon: Terminal,
		items: [
			{ label: 'Languages', value: 'TypeScript, Python, C++' },
			{ label: 'Frontend', value: 'SvelteKit, React, Next.js' },
			{ label: 'Backend', value: 'tRPC, Django, FastAPI, GraphQL' },
			{ label: 'Database', value: 'PostgreSQL, Redis, SQL Server' },
			{ label: 'Infra', value: 'Docker, Terraform, AWS' },
			{ label: 'Editor', value: 'VS Code' }
		]
	},
	{
		title: 'SOFTWARE',
		Icon: Package,
		items: [
			{ label: 'Terminal', value: 'Bash' },
			{ label: 'Browser', value: 'Google Chrome, Zen' },
			{ label: 'Notes', value: 'Notion' },
			{ label: 'Git', value: 'Github, Gitlab' },
			{ label: 'Design', value: 'Figma' }
		]
	},
	{
		title: 'MISC',
		Icon: Sparkles,
		items: [
			{ label: 'Location', value: 'New Zealand' },
			{ label: 'Camera', value: 'Canon EOS 650' },
			{ label: 'Currently reading', value: 'The Pragmatic Programmer, Database Internals, ' },
			{ label: 'Music', value: "SOAD, Guns N' Roses, Alice in Chains" }
		]
	}
];
