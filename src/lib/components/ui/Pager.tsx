import { range } from 'lodash-es';
import { Fragment, type ReactNode } from 'react';
import { bevelButtonClassName } from '~/lib/components/ui/BevelButton';

type PagerLinkProps = {
	page: number;
	disabled: boolean;
	ariaLabel: string;
	className: string;
	children: ReactNode;
};

type PagerProps = {
	currentPage: number;
	totalPages: number;
	layout: 'numbered' | 'compact';
	renderLink: (props: PagerLinkProps) => ReactNode;
	pageLabel?: (page: number) => string;
};

const compactLinkClassName = bevelButtonClassName({ variant: 'white', className: 'text-black' });

const stepLinkClassName = bevelButtonClassName({
	variant: 'light',
	className: 'py-0.5 font-normal text-black'
});

export function Pager({
	currentPage,
	totalPages,
	layout,
	renderLink,
	pageLabel = (page) => `Page ${page}`
}: PagerProps) {
	const isFirstPage = currentPage <= 1;
	const isLastPage = currentPage >= totalPages;

	if (layout === 'compact') {
		return (
			<div className="flex items-center gap-2">
				{renderLink({
					page: currentPage - 1,
					disabled: isFirstPage,
					ariaLabel: 'Previous page',
					className: compactLinkClassName,
					children: '‹ Prev'
				})}
				<span className="px-2 text-xs font-bold text-purple-800">
					{currentPage} / {totalPages}
				</span>
				{renderLink({
					page: currentPage + 1,
					disabled: isLastPage,
					ariaLabel: 'Next page',
					className: compactLinkClassName,
					children: 'Next ›'
				})}
			</div>
		);
	}

	return (
		<div className="px-3 py-1">
			<div className="flex items-center justify-between">
				{renderLink({
					page: currentPage - 1,
					disabled: isFirstPage,
					ariaLabel: 'Previous',
					className: stepLinkClassName,
					children: '‹'
				})}
				<div className="flex items-center gap-1">
					{range(1, totalPages + 1).map((page) => (
						<Fragment key={page}>
							{renderLink({
								page,
								disabled: false,
								ariaLabel: pageLabel(page),
								className: bevelButtonClassName({
									variant: page === currentPage ? 'selected' : 'light'
								}),
								children: page
							})}
						</Fragment>
					))}
				</div>
				{renderLink({
					page: currentPage + 1,
					disabled: isLastPage,
					ariaLabel: 'Next',
					className: stepLinkClassName,
					children: '›'
				})}
			</div>
			<div className="mt-2 text-center font-mono text-xs leading-none text-gray-500">
				{currentPage}/{totalPages}
			</div>
		</div>
	);
}
