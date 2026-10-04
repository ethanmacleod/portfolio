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
		<div className={insetClassName('white', 'overflow-x-auto')}>
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
								<td key={column.label} className="px-2 py-1 whitespace-nowrap text-gray-800">
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
