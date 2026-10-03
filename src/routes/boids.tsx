import { createFileRoute } from '@tanstack/react-router';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { pageMeta } from '~/lib/site';

export const Route = createFileRoute('/boids')({
	staticData: {
		heading: {
			title: 'Boids Simulation',
			subtitle:
				"Always thought boids were cool. 3D would be the next plan... let's take a look at D3"
		},
		sitemap: { priority: 0.5, changefreq: 'yearly' },
		isFullscreen: true
	},
	head: () => ({
		meta: pageMeta('Boids - Ethan MacLeod', 'Interactive boids flocking simulation')
	}),
	component: BoidsPage
});

function BoidsPage() {
	return <RetroDiv className="p-3">This page moves over in the next migration step.</RetroDiv>;
}
