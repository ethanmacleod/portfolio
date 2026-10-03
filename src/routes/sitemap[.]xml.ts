import { createFileRoute } from '@tanstack/react-router';
import { formatISO } from 'date-fns';
import { orderBy } from 'lodash-es';
import { getRouter } from '~/router';
import { siteUrl } from '~/lib/site';

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: () => {
				const lastmod = formatISO(new Date(), { representation: 'date' });
				const pages = Object.values(getRouter().routesByPath).flatMap((route) => {
					const sitemap = route.options.staticData?.sitemap;
					return sitemap ? [{ path: route.fullPath, ...sitemap }] : [];
				});

				const urls = orderBy(pages, ['priority', 'path'], ['desc', 'asc']).map(
					(page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
				);

				const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

				return new Response(xml, {
					headers: {
						'Content-Type': 'application/xml',
						'Cache-Control': 'max-age=0, s-maxage=3600'
					}
				});
			}
		}
	}
});
