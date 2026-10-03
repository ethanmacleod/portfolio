import { createFileRoute } from '@tanstack/react-router';
import { bevelButtonClassName } from '~/lib/components/ui/BevelButton';
import { PageHeader, Window } from '~/lib/components/ui/Window';
import { pageMeta } from '~/lib/site';

const resumePath = '/resume.pdf';

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
		<div className="flex h-full min-h-0 flex-col gap-3">
			<PageHeader
				title="RESUME.PDF"
				description="Ethan MacLeod - Software Developer"
				aside={
					<a
						href={resumePath}
						download
						className={bevelButtonClassName({
							variant: 'primary',
							size: 'medium',
							className: 'px-4 py-2 font-mono'
						})}
					>
						DOWNLOAD
					</a>
				}
			/>

			<Window className="flex-1 overflow-hidden">
				<iframe src={resumePath} title="Resume" className="h-full w-full border-none" />
			</Window>
		</div>
	);
}
