import { createFileRoute } from '@tanstack/react-router';
import { ResumeDownloadLink, ResumeViewer } from '~/lib/components/ResumeViewer';
import { PageStack } from '~/lib/components/ui/Layout';
import { PageHeader } from '~/lib/components/ui/Window';
import { pageMeta } from '~/lib/site';

export const Route = createFileRoute('/resume')({
	staticData: {
		heading: {
			title: 'My Resume',
			subtitle: 'Always keen for some feedback, chuck it in the guestbook!'
		},
		sitemap: { priority: 0.8, changefreq: 'monthly' }
	},
	head: () => ({
		meta: pageMeta('Resume - Ethan MacLeod', 'My resume and professional background')
	}),
	component: ResumePage
});

function ResumePage() {
	return (
		<PageStack fillsHeight>
			<PageHeader
				title="Resume"
				description="Ethan MacLeod - Software Developer"
				aside={<ResumeDownloadLink />}
			/>
			<ResumeViewer />
		</PageStack>
	);
}
