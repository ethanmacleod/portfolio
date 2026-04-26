import type { Node, Drive, NetworkDevice, Stack } from '$lib/types';

export const optiplexNodes: Node[] = [
	{
		model: 'OptiPlex 7060 Micro',
		role: 'Swarm Manager',
		cpu: 'Intel Core i7-8700',
		ram: '16GB DDR4',
		storage: '512GB NVMe',
		os: 'Ubuntu Server',
		status: 'online'
	},
	{
		model: 'OptiPlex 7050 Micro',
		role: 'Swarm Worker',
		cpu: 'Intel Core i5-7500',
		ram: '16GB DDR4',
		storage: '256GB SSD',
		os: 'Ubuntu Server',
		status: 'online'
	},
	{
		model: 'OptiPlex 7050 Micro',
		role: 'Swarm Worker',
		cpu: 'Intel Core i5-7500',
		ram: '16GB DDR4',
		storage: '256GB SSD',
		os: 'Ubuntu Server',
		status: 'online'
	},
	{
		model: 'OptiPlex 7070 Micro',
		role: 'Swarm Worker',
		cpu: 'Intel Core i7-9700',
		ram: '16GB DDR4',
		storage: '256GB NVMe',
		os: 'Ubuntu Server',
		status: 'online'
	},
	{
		model: 'OptiPlex 7070 Micro',
		role: 'Swarm Worker',
		cpu: 'Intel Core i7-9700',
		ram: '16GB DDR4',
		storage: '256GB NVMe',
		os: 'Ubuntu Server',
		status: 'online'
	}
];

export const piNodes: Node[] = [
	{
		model: 'Raspberry Pi 5',
		role: 'DNS / Network Services',
		cpu: 'Cortex-A76 @ 2.4GHz',
		ram: '8GB LPDDR4X',
		storage: '256GB microSD',
		os: 'Raspberry Pi OS',
		status: 'online'
	},
	{
		model: 'Raspberry Pi 4B',
		role: 'Media / Utility Services',
		cpu: 'Cortex-A72 @ 1.8GHz',
		ram: '8GB LPDDR4',
		storage: '256GB microSD',
		os: 'Raspberry Pi OS',
		status: 'online'
	}
];

export const nasModel = 'Synology 2-Bay NAS';
export const nasNotes = 'RAID 1 - 16TB usable';

export const nasDrives: Drive[] = [
	{ label: 'Bay 1', size: '16TB', type: 'Seagate Exos X' },
	{ label: 'Bay 2', size: '16TB', type: 'Seagate Exos X' }
];

export const extraDrives: Drive[] = [
	{ label: '1', size: '4TB', type: 'Seagate IronWolf' },
	{ label: '2', size: '4TB', type: 'Seagate IronWolf' },
	{ label: '3', size: '4TB', type: 'Seagate IronWolf' },
	{ label: '4', size: '4TB', type: 'Seagate IronWolf' }
];

export const networking: NetworkDevice[] = [
	{ name: 'Router', model: 'Ubiquiti UCG-Ultra', notes: '2.5GbE WAN · 4x 1GbE LAN' },
	{ name: 'Core Switch', model: 'MikroTik 10" Managed', notes: 'Core managed switch' },
	{ name: 'Edge Switch', model: 'TP-Link 5-Port PoE', notes: 'Edge PoE switch' },
	{ name: 'Access Points (x5)', model: 'Unifi U6 Pro', notes: 'WiFi 6, ceiling mounted' },
	{ name: 'Rack', model: '10" Free Standing Tower', notes: 'Desktop form factor' }
];

export const stacks: Stack[] = [
	{
		name: 'Media',
		category: 'Media',
		status: 'online',
		services: [
			'Plex',
			'Sonarr',
			'Radarr',
			'Lidarr',
			'Bazarr',
			'Prowlarr',
			'Jackett',
			'SABnzbd',
			'qBittorrent',
			'Seerr',
			'Tautulli',
			'Dispatcharr',
			'Gluetun VPN'
		]
	},
	{
		name: 'Audiobooks',
		category: 'Media',
		status: 'online',
		services: ['Audiobookshelf', 'AudiobookRequest', 'qBittorrent']
	},
	{
		name: 'Books',
		category: 'Media',
		status: 'online',
		services: ['Calibre-Web Automated', 'Book Downloader']
	},
	{
		name: 'Encoding',
		category: 'Media',
		status: 'online',
		services: ['Tdarr (QSV)', 'Tdarr Node']
	},
	{
		name: 'Videos',
		category: 'Media',
		status: 'standby',
		services: []
	},
	{
		name: 'Monitoring',
		category: 'Monitoring',
		status: 'online',
		services: ['Grafana', 'Prometheus', 'Node Exporter', 'Scanopy']
	},
	{
		name: 'Networking',
		category: 'Networking',
		status: 'online',
		services: ['Nginx Proxy Manager', 'Pi-hole', 'Cloudflared']
	},
	{
		name: 'Documentation',
		category: 'Tools',
		status: 'online',
		services: ['BookStack', 'Snipe-IT', 'Glance', 'Homarr']
	},
	{
		name: 'Tooling',
		category: 'Tools',
		status: 'online',
		services: ['Tandoor Recipes', 'Actual Budget', 'Stirling PDF']
	},
	{
		name: 'Dev',
		category: 'Tools',
		status: 'online',
		services: [
			'Infisical',
			'MinIO',
			'Mailpit',
			'RedisInsight',
			'Postgres',
			'Redis',
			'MongoDB',
			'SQL Server'
		]
	},
	{
		name: 'Automation',
		category: 'Automation',
		status: 'online',
		services: ['n8n']
	},
	{
		name: 'Personal',
		category: 'Personal',
		status: 'online',
		services: ['Habitica']
	},
	{
		name: 'Business',
		category: 'Personal',
		status: 'online',
		services: ['Invoice Ninja']
	},
	{
		name: 'LLM',
		category: 'AI',
		status: 'standby',
		services: []
	}
];

export const stackCategories = [...new Set(stacks.map((s) => s.category))];

export const categoryVariant: Record<string, 'blue' | 'green'> = {
	Media: 'green',
	Monitoring: 'blue',
	Networking: 'blue',
	Tools: 'blue',
	Automation: 'green',
	Personal: 'green',
	AI: 'blue'
};
