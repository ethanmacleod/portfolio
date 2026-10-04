import { createFileRoute } from '@tanstack/react-router';
import { orderBy } from 'lodash-es';
import { getRouter } from '~/router';
import { siteUrl } from '~/lib/site';

let sitemapXml: string | null = null;

function buildSitemapXml() {
	const pages = Object.values(getRouter().routesByPath).flatMap((route) => {
		const sitemap = route.options.staticData?.sitemap;
		return sitemap ? [{ path: route.fullPath, ...sitemap }] : [];
	});

	const urls = orderBy(pages, ['priority', 'path'], ['desc', 'asc']).map(
		(page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
	);

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: () => {
				sitemapXml ??= buildSitemapXml();
				return new Response(sitemapXml, {
					headers: {
						'Content-Type': 'application/xml',
						'Cache-Control': 'max-age=0, s-maxage=3600'
					}
				});
			}
		}
	}
});
