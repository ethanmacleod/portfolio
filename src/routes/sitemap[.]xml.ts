import { createFileRoute } from '@tanstack/react-router';
import { formatISO } from 'date-fns';
import { siteUrl } from '~/lib/site';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/projects', priority: '0.9', changefreq: 'weekly' },
	{ path: '/resume', priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'yearly' },
	{ path: '/uses', priority: '0.7', changefreq: 'monthly' },
	{ path: '/homelab', priority: '0.7', changefreq: 'monthly' },
	{ path: '/boids', priority: '0.5', changefreq: 'yearly' }
];

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: () => {
				const lastmod = formatISO(new Date(), { representation: 'date' });

				const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		({ path, priority, changefreq }) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
	)
	.join('\n')}
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
