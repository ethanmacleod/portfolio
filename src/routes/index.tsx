import { createFileRoute } from '@tanstack/react-router';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { pageMeta } from '~/lib/site';

export const Route = createFileRoute('/')({
	head: () => ({
		meta: pageMeta(
			'Ethan MacLeod - Software Developer',
			'NZ-based software developer. Personal portfolio showcasing projects, homelab, and more.'
		)
	}),
	component: HomePage
});

function HomePage() {
	return <RetroDiv className="p-3">This page moves over in the next migration step.</RetroDiv>;
}
