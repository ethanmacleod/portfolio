import { HeadContent, Scripts } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from 'react';
import { SparkleCursor } from '~/lib/components/SparkleCursor';

export function AppDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-[url('/background.webp')] bg-repeat">
				<SparkleCursor />
				{children}
				<Analytics />
				<Scripts />
			</body>
		</html>
	);
}
