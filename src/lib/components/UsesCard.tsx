import { Text } from '~/lib/components/ui/Text';
import { Window } from '~/lib/components/ui/Window';
import type { Section } from '~/lib/types';

export function UsesCard({ section }: { section: Section }) {
	return (
		<Window className="p-3">
			<Text variant="cardTitle" className="mb-3 flex items-center gap-2">
				<section.Icon size={14} aria-hidden="true" />
				{section.title}
			</Text>
			<div className="flex flex-col gap-1">
				{section.items.map((item) => (
					<div
						key={item.label}
						className="flex gap-2 border-b border-gray-200 pb-1 last:border-0 last:pb-0"
					>
						<Text variant="fieldLabel" className="w-28 shrink-0">
							{item.label}
						</Text>
						<Text variant="value" as="span" className="min-w-0">
							{item.value}
						</Text>
					</div>
				))}
			</div>
		</Window>
	);
}
