import { bevelButtonClassName } from '~/lib/components/ui/BevelButton';
import { Window } from '~/lib/components/ui/Window';

const resumePath = '/resume.pdf';

export function ResumeDownloadLink() {
	return (
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
	);
}

export function ResumeViewer() {
	return (
		<Window className="flex-1 overflow-hidden">
			<iframe src={resumePath} title="Resume" className="h-full w-full border-none" />
		</Window>
	);
}
