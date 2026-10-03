import { useMatches } from '@tanstack/react-router';

const fallbackHeading = {
	title: 'Welcome to My Site!',
	subtitle: 'Thanks for visiting!'
};

export function DynamicHeader() {
	const heading =
		useMatches({ select: (matches) => matches.at(-1)?.staticData.heading }) ?? fallbackHeading;

	return (
		<div className="box-border flex h-full w-full flex-col justify-between bg-gradient-to-br from-green-600 to-teal-700 px-4 py-2 font-window leading-tight text-white">
			<span className="rainbow-text text-center text-base leading-tight font-bold">
				{heading.title}
			</span>
			<span className="text-center text-xs leading-tight">{heading.subtitle}</span>
		</div>
	);
}
