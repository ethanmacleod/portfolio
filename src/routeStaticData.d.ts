import '@tanstack/react-router';

declare module '@tanstack/react-router' {
	interface StaticDataRouteOption {
		heading?: {
			title: string;
			subtitle: string;
		};
		sitemap?: {
			priority: number;
			changefreq: 'weekly' | 'monthly' | 'yearly';
		};
		isFullscreen?: boolean;
	}
}
