import { createRouter } from '@tanstack/react-router';
import { ErrorPage, NotFoundPage } from '~/lib/components/ErrorPages';
import { routeTree } from './routeTree.gen';

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultErrorComponent: ErrorPage,
		defaultNotFoundComponent: NotFoundPage
	});
}
