import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export interface Skill {
	name: string;
	icon: string;
	brandColor: string;
}

export interface SpecItem {
	label: string;
	value: string;
}

export interface Section {
	title: string;
	Icon: LucideIcon;
	items: SpecItem[];
}

export type NodeStatus = 'online' | 'offline' | 'standby';

export interface Node {
	model: string;
	role: string;
	cpu: string;
	ram: string;
	storage: string;
	os: string;
	status: NodeStatus;
}

export interface Drive {
	size: string;
	type: string;
	label: string;
}

export interface NetworkDevice {
	name: string;
	model: string;
	notes: string;
}

export interface Stack {
	name: string;
	category: string;
	status: NodeStatus;
	services: string[];
}

export interface Social {
	href: string;
	label: string;
	Icon: ComponentType<{ className?: string }>;
	color: string;
}

export interface StatusConfig {
	state: 'open' | 'busy' | 'away';
	label: string;
	detail: string;
	timezone: string;
	response: string;
}
