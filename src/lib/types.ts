export interface Analytics {
	totalViews: number;
	badActors: number;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	longDescription?: string;
	githubUrl: string;
	technologies: {
		name: string;
		icon?: string;
		brandColor?: string;
	}[];
	images: {
		url: string;
		caption?: string;
		alt: string;
	}[];
	status: 'active' | 'completed' | 'archived';
	featured?: boolean;
	demoUrl?: string;
	startDate?: string;
	endDate?: string;
}

export interface GuestbookEntry {
	id: number;
	name: string;
	message: string;
	location?: string;
	createdAt: Date;
}

export interface PaginationInfo {
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
}
