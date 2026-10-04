import { DetailsTable } from '~/lib/components/ui/DetailsTable';
import { SectionWindow } from '~/lib/components/ui/Window';
import type { Section, SpecItem } from '~/lib/types';

const specColumns: { label: string; value: (item: SpecItem) => string }[] = [
	{ label: 'Name', value: (item) => item.label },
	{ label: 'Value', value: (item) => item.value }
];

export function UsesCard({ section }: { section: Section }) {
	return (
		<SectionWindow
			label={
				<span className="flex items-center gap-1.5">
					<section.Icon size={12} aria-hidden="true" />
					{section.title}
				</span>
			}
			grows
		>
			<DetailsTable columns={specColumns} rows={section.items} />
		</SectionWindow>
	);
}
