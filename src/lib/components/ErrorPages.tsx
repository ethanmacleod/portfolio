import { Link, type ErrorComponentProps } from '@tanstack/react-router';
import { useEffect } from 'react';
import { BevelButton, bevelButtonClassName } from '~/lib/components/ui/BevelButton';
import { Text } from '~/lib/components/ui/Text';
import { Window } from '~/lib/components/ui/Window';

export function NotFoundPage() {
	return (
		<Window className="mx-auto max-w-lg p-4">
			<Text variant="pageTitle">Page not found</Text>
			<Text variant="value" className="mt-2">
				This page doesn't exist. It might be under construction, like the rest of the site.
			</Text>
			<Link
				to="/"
				className={bevelButtonClassName({
					variant: 'face',
					className: 'mt-4 self-start px-3 font-mono'
				})}
			>
				BACK TO HOME
			</Link>
		</Window>
	);
}

export function ErrorPage({ error, reset }: ErrorComponentProps) {
	useEffect(
		function logError() {
			console.error('page: render failed', error);
		},
		[error]
	);

	return (
		<Window className="error-dialog mx-auto max-w-lg p-4">
			<Text variant="pageTitle" className="text-red-700">
				Error
			</Text>
			<Text variant="value" className="mt-2">
				Something on this page broke. Try again, and if it keeps happening let me know through the
				contact page.
			</Text>
			<BevelButton variant="face" onClick={reset} className="mt-4 self-start px-3 font-mono">
				TRY AGAIN
			</BevelButton>
		</Window>
	);
}
