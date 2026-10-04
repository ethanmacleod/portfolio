import type { ReactNode } from 'react';
import { insetClassName } from '~/lib/components/ui/Bevel';

type DetailsColumn<Row> = {
	label: string;
	value: (row: Row) => ReactNode;
};

type DetailsTableProps<Row> = {
	columns: DetailsColumn<Row>[];
	rows: Row[];
};

export function DetailsTable<Row>({ columns, rows }: DetailsTableProps<Row>) {
	return (
		<div className={insetClassName('white', 'flex-1 overflow-x-auto')}>
			<table className="w-full border-separate border-spacing-0 font-mono text-xs">
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								key={column.label}
								className="border border-t-white border-r-bevel-dark border-b-bevel-dark border-l-white bg-win-button px-2 py-0.5 text-left font-normal whitespace-nowrap"
							>
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column) => (
								<td
									key={column.label}
									className="border-r border-b border-gray-300 px-2 py-1 align-top text-gray-800 first:whitespace-nowrap first:text-win-navy"
								>
									{column.value(row)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
