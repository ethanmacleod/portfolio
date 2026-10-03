import { createFileRoute } from '@tanstack/react-router';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { pageMeta } from '~/lib/site';

export const Route = createFileRoute('/contact')({
	head: () => ({
		meta: pageMeta('Contact - Ethan MacLeod', 'Get in touch with me')
	}),
	component: ContactPage
});

function ContactPage() {
	return <RetroDiv className="p-3">This page moves over in the next migration step.</RetroDiv>;
}
