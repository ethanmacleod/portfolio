export const siteUrl = 'https://ethanmacleod.com';

export function pageMeta(title: string, description: string) {
	return [
		{ title },
		{ name: 'description', content: description },
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description }
	];
}
