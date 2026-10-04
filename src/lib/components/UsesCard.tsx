import { Window } from '~/lib/components/ui/Window';
import type { Section } from '~/lib/types';

export function UsesCard({ section }: { section: Section }) {
	return (
		<Window className="p-3">
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
		</Window>
	);
}
