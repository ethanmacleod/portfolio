import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const securityHeaders = {
	headers: {
		'x-frame-options': 'DENY',
		'content-security-policy': "frame-ancestors 'none'",
		'x-content-type-options': 'nosniff',
		'referrer-policy': 'strict-origin-when-cross-origin'
	}
};

const longLivedCache = { headers: { 'cache-control': 'public, max-age=31536000, immutable' } };

export default defineConfig({
	resolve: {
		tsconfigPaths: true
	},
	plugins: [
		tailwindcss(),
		tanstackStart(),
		nitro({
			routeRules: {
				'/**': securityHeaders,
				'/gifs/**': longLivedCache,
				'/skills/**': longLivedCache,
				'/project-screenshots/**': longLivedCache
			}
		}),
		viteReact()
	]
});
