import { createFileRoute } from '@tanstack/react-router';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { pageMeta } from '~/lib/site';

const resumePath = '/resume.pdf';

export const Route = createFileRoute('/resume')({
	head: () => ({
		meta: pageMeta('Resume - Ethan MacLeod', 'My resume and professional background')
	}),
	component: ResumePage
});

function ResumePage() {
	return (
		<div className="flex h-full min-h-0 flex-col gap-3">
			<RetroDiv className="shrink-0 p-3">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-mono text-base font-bold text-blue-700">{'// RESUME.PDF'}</h1>
						<p className="mt-1 font-mono text-xs text-gray-600">
							Ethan MacLeod - Software Developer
						</p>
					</div>
					<a
						href={resumePath}
						download
						className="bevel-button bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-mono text-xs font-bold text-white transition-opacity hover:opacity-90"
					>
						DOWNLOAD
					</a>
				</div>
			</RetroDiv>

			<RetroDiv className="flex-1 overflow-hidden">
				<iframe src={resumePath} title="Resume" className="h-full w-full border-none" />
			</RetroDiv>
		</div>
	);
}
