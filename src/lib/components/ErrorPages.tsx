import { Link, type ErrorComponentProps } from '@tanstack/react-router';
import { useEffect } from 'react';
import { RetroDiv } from '~/lib/components/RetroDiv';

export function NotFoundPage() {
	return (
		<RetroDiv className="mx-auto max-w-lg p-4">
			<h1 className="font-mono text-base font-bold text-blue-700">{'// 404.TXT'}</h1>
			<p className="mt-2 font-mono text-xs text-gray-700">
				This page doesn't exist. It might be under construction, like the rest of the site.
			</p>
			<Link
				to="/"
				className="bevel-button mt-4 self-start bg-win-face px-3 py-1 font-mono text-xs font-bold"
			>
				BACK TO HOME
			</Link>
		</RetroDiv>
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
		<RetroDiv className="error-dialog mx-auto max-w-lg p-4">
			<h1 className="font-mono text-base font-bold text-red-700">{'// FATAL_ERROR.EXE'}</h1>
			<p className="mt-2 font-mono text-xs text-gray-700">
				Something on this page broke. Try again, and if it keeps happening let me know through the
				contact page.
			</p>
			<button
				type="button"
				onClick={reset}
				className="bevel-button mt-4 self-start bg-win-face px-3 py-1 font-mono text-xs font-bold"
			>
				TRY AGAIN
			</button>
		</RetroDiv>
	);
}
