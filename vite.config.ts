import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

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
				'/gifs/**': longLivedCache,
				'/skills/**': longLivedCache,
				'/project-screenshots/**': longLivedCache
			}
		}),
		viteReact()
	]
});
