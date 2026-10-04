import { createFileRoute } from '@tanstack/react-router';
import {
	ContactFormWindow,
	ContactSocialLinks,
	ContactStatusPanel
} from '~/lib/components/ContactPanels';
import { SplitLayout } from '~/lib/components/ui/Layout';
import { PageHeader } from '~/lib/components/ui/Window';
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
	return (
		<SplitLayout
			asideWidth="wide"
			fillsHeight
			aside={
				<>
					<ContactStatusPanel />
					<ContactSocialLinks />
				</>
			}
		>
			<PageHeader title="CONTACT" description="Fill out the form below and I'll get back to you." />
			<ContactFormWindow />
		</SplitLayout>
	);
}
