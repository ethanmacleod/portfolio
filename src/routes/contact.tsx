import { createFileRoute } from '@tanstack/react-router';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { pageMeta } from '~/lib/site';

export const Route = createFileRoute('/contact')({
	staticData: {
		heading: {
			title: 'Contact Me!',
			subtitle: "Get in touch - I'd love to hear from you"
		},
		sitemap: { priority: 0.8, changefreq: 'yearly' }
	},
	head: () => ({
		meta: pageMeta('Contact - Ethan MacLeod', 'Get in touch with me')
	}),
	component: ContactPage
});

function ContactPage() {
	return <RetroDiv className="p-3">This page moves over in the next migration step.</RetroDiv>;
}
