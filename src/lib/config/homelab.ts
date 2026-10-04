import type { Drive, NetworkDevice, Node, PanelVariant, Stack } from '~/lib/types';
import { uniq } from 'lodash-es';

export const optiplexNodes: Node[] = [
	{
		model: 'OptiPlex 7060 Micro',
		role: 'k3s Server',
		cpu: 'Intel Core i7-8700',
		ramGb: 16,
		ramType: 'DDR4',
		storage: '512GB NVMe',
		os: 'Ubuntu Server'
	},
	{
		model: 'OptiPlex 7050 Micro',
		role: 'k3s Server',
		cpu: 'Intel Core i5-7500',
		ramGb: 16,
		ramType: 'DDR4',
		storage: '256GB SSD',
		os: 'Ubuntu Server'
	},
	{
		model: 'OptiPlex 7050 Micro',
		role: 'k3s Server',
		cpu: 'Intel Core i5-7500',
		ramGb: 16,
		ramType: 'DDR4',
		storage: '256GB SSD',
		os: 'Ubuntu Server'
	},
	{
		model: 'OptiPlex 7070 Micro',
		role: 'k3s Agent',
		cpu: 'Intel Core i7-9700',
		ramGb: 16,
		ramType: 'DDR4',
		storage: '256GB NVMe',
		os: 'Ubuntu Server'
	},
	{
		model: 'OptiPlex 7070 Micro',
		role: 'k3s Agent',
		cpu: 'Intel Core i7-9700',
		ramGb: 16,
		ramType: 'DDR4',
		storage: '256GB NVMe',
		os: 'Ubuntu Server'
	}
];

export const piNodes: Node[] = [
	{
		model: 'Raspberry Pi 5',
		role: 'DNS / Network Services',
		cpu: 'Cortex-A76 @ 2.4GHz',
		ramGb: 8,
		ramType: 'LPDDR4X',
		storage: '256GB microSD',
		os: 'Raspberry Pi OS'
	},
	{
		model: 'Raspberry Pi 4B',
		role: 'Media / Utility Services',
		cpu: 'Cortex-A72 @ 1.8GHz',
		ramGb: 8,
		ramType: 'LPDDR4',
		storage: '256GB microSD',
		os: 'Raspberry Pi OS'
	}
];

export const nasModel = 'Synology 2-Bay NAS';
export const nasNotes = 'RAID 1 - 16TB usable';

export const nasDrives: Drive[] = [
	{ label: 'Bay 1', size: '16TB', type: 'Seagate Exos X' },
	{ label: 'Bay 2', size: '16TB', type: 'Seagate Exos X' }
];

export const networking: NetworkDevice[] = [
	{ name: 'Router', model: 'Ubiquiti UCG-Ultra', notes: '2.5GbE WAN · 4x 1GbE LAN' },
	{ name: 'Core Switch', model: 'MikroTik 10" Managed', notes: 'Core managed switch' },
	{ name: 'Edge Switch', model: 'TP-Link 5-Port PoE', notes: 'Edge PoE switch' },
	{ name: 'Access Points (x5)', model: 'Unifi U6 Pro', notes: 'WiFi 6, ceiling mounted' },
	{ name: 'Rack', model: '10" Free Standing Tower', notes: 'Desktop form factor' }
];

export const stackCategoryVariants = {
	Media: 'green',
	Infrastructure: 'blue',
	Tools: 'blue',
	Personal: 'green'
} as const satisfies Record<string, PanelVariant>;

export type StackCategory = keyof typeof stackCategoryVariants;

export const stacks: Stack[] = [
	{
		name: 'Media',
		category: 'Media',
		services: [
			'Plex',
			'Sonarr',
			'Radarr',
			'Bazarr',
			'Prowlarr',
			'Jackett',
			'SABnzbd',
			'qBittorrent',
			'Seerr',
			'Tautulli'
		]
	},
	{
		name: 'Books',
		category: 'Media',
		services: ['Calibre-Web Automated', 'Shelfmark', 'qBittorrent', 'SABnzbd']
	},
	{
		name: 'Audiobooks',
		category: 'Media',
		services: ['Audiobookshelf']
	},
	{
		name: 'Cluster',
		category: 'Infrastructure',
		services: [
			'Argo CD',
			'Traefik',
			'MetalLB',
			'kube-vip',
			'Longhorn',
			'cert-manager',
			'Cloudflare Tunnel',
			'Headlamp'
		]
	},
	{
		name: 'Networking',
		category: 'Infrastructure',
		services: ['Pi-hole', 'Tailscale']
	},
	{
		name: 'Monitoring',
		category: 'Infrastructure',
		services: ['Prometheus', 'Grafana', 'Alertmanager', 'Loki', 'Alloy']
	},
	{
		name: 'Dev',
		category: 'Tools',
		services: ['Postgres', 'Redis', 'MongoDB', 'SQL Server', 'MinIO', 'Mailpit']
	},
	{
		name: 'Documentation',
		category: 'Tools',
		services: ['Homepage', 'Glance', 'InvenTree']
	},
	{
		name: 'Automation',
		category: 'Tools',
		services: ['n8n']
	},
	{
		name: 'Business',
		category: 'Personal',
		services: ['Invoice Ninja', 'Actual Budget']
	},
	{
		name: 'Allsky',
		category: 'Personal',
		services: ['indi-allsky', 'Mosquitto', 'mqtt2prometheus']
	}
];

export const stackCategories = uniq(stacks.map((stack) => stack.category));
