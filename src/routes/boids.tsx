import { createFileRoute } from '@tanstack/react-router';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { pageMeta } from '~/lib/site';

export const Route = createFileRoute('/boids')({
	head: () => ({
		meta: pageMeta('Boids - Ethan MacLeod', 'Interactive boids flocking simulation')
	}),
	component: BoidsPage
});

function BoidsPage() {
	return <RetroDiv className="p-3">This page moves over in the next migration step.</RetroDiv>;
}
