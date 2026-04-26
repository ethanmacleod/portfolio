import type { RequestHandler } from './$types';

const SITE = 'https://ethanmacleod.com';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/projects', priority: '0.9', changefreq: 'weekly' },
	{ path: '/resume', priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'yearly' },
	{ path: '/uses', priority: '0.7', changefreq: 'monthly' },
	{ path: '/homelab', priority: '0.7', changefreq: 'monthly' }
];

export const GET: RequestHandler = () => {
	const lastmod = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		({ path, priority, changefreq }) => `  <url>
    <loc>${SITE}${path}</loc>
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
};
