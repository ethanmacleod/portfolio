import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from 'react';
import appCss from '~/app.css?url';
import { trackVisitAndGetAnalytics } from '~/lib/analytics.functions';
import { ErrorPage, NotFoundPage } from '~/lib/components/ErrorPages';
import { AppShell } from '~/lib/components/nav/AppShell';
import { SparkleCursor } from '~/lib/components/SparkleCursor';
import { getHighFiveCount } from '~/lib/highFive.functions';
import { siteUrl } from '~/lib/site';

export const Route = createRootRoute({
	loader: async () => {
		const [analytics, highFiveCount] = await Promise.all([
			trackVisitAndGetAnalytics(),
			getHighFiveCount()
		]);
		return { analytics, highFiveCount };
	},
	shouldReload: false,
	head: ({ matches }) => {
		const pageUrl = `${siteUrl}${matches.at(-1)?.pathname ?? '/'}`;
		return {
			meta: [
				{ charSet: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ property: 'og:site_name', content: 'Ethan MacLeod' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:image', content: `${siteUrl}/me2.jpg` },
				{ property: 'og:url', content: pageUrl },
				{ property: 'og:locale', content: 'en_NZ' },
				{ name: 'twitter:card', content: 'summary' }
			],
			links: [
				{ rel: 'stylesheet', href: appCss },
				{ rel: 'canonical', href: pageUrl },
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					media: '(prefers-color-scheme: light)',
					href: '/favicon-32x32.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '512x512',
					media: '(prefers-color-scheme: light)',
					href: '/favicon-light.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					media: '(prefers-color-scheme: dark)',
					href: '/favicon-dark-32x32.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '512x512',
					media: '(prefers-color-scheme: dark)',
					href: '/favicon-dark.png'
				},
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
			]
		};
	},
	shellComponent: RootDocument,
	component: RootLayout,
	errorComponent: ErrorPage,
	notFoundComponent: NotFoundPage
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-[url('/background.webp')] bg-repeat">
				<SparkleCursor />
				{children}
				<Analytics />
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout() {
	const { analytics, highFiveCount } = Route.useLoaderData();

	return (
		<AppShell analytics={analytics} highFiveCount={highFiveCount}>
			<Outlet />
		</AppShell>
	);
}
