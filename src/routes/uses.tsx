import { createFileRoute } from '@tanstack/react-router';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { sections } from '~/lib/config/uses';
import { pageMeta } from '~/lib/site';
import type { Section } from '~/lib/types';

export const Route = createFileRoute('/uses')({
	head: () => ({
		meta: pageMeta('Uses - Ethan MacLeod', 'What I use - hardware, software, and more')
	}),
	component: UsesPage
});

function UsesPage() {
	return (
		<div className="flex h-full min-h-0 flex-col gap-3">
			<RetroDiv className="shrink-0 p-3">
				<h1 className="font-mono text-base font-bold text-blue-700">{'// USES.TXT'}</h1>
				<p className="mt-1 font-mono text-xs text-gray-600">
					Hardware, software, and everything I couldn't put on the other pages.
				</p>
			</RetroDiv>

			<div className="min-h-0 flex-1 overflow-auto">
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
					{sections.map((section) => (
						<UsesCard key={section.title} section={section} />
					))}
				</div>
			</div>
		</div>
	);
}

function UsesCard({ section }: { section: Section }) {
	return (
		<RetroDiv className="p-3">
			<h2 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-blue-700">
				<section.Icon size={14} aria-hidden="true" />
				{section.title}
			</h2>
			<div className="flex flex-col gap-1">
				{section.items.map((item) => (
					<div
						key={item.label}
						className="flex gap-2 border-b border-gray-200 pb-1 last:border-0 last:pb-0"
					>
						<span className="w-28 shrink-0 font-mono text-xs font-bold text-gray-500">
							{item.label}
						</span>
						<span className="min-w-0 font-mono text-xs text-gray-800">{item.value}</span>
					</div>
				))}
			</div>
		</RetroDiv>
	);
}
