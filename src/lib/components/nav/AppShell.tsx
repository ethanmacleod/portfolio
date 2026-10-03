import { useLocation } from '@tanstack/react-router';
import { format } from 'date-fns';
import { Fragment, useState, type ReactNode } from 'react';
import type { trackVisitAndGetAnalytics } from '~/lib/analytics.functions';
import { Header } from '~/lib/components/nav/Header';
import { LeftNav } from '~/lib/components/nav/LeftNav';
import { useNow } from '~/lib/hooks/useNow';
import { cn, mapNullish } from '~/lib/utils';

const fullscreenPathnames = ['/boids'];

const checkerboardBackground = {
	backgroundColor: '#005050',
	backgroundImage:
		'linear-gradient(45deg, #003d3d 25%, transparent 25%), linear-gradient(-45deg, #003d3d 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #003d3d 75%), linear-gradient(-45deg, transparent 75%, #003d3d 75%)',
	backgroundSize: '8px 8px',
	backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
};

const sidebarClassName = 'bevel-button w-[220px] overflow-y-auto bg-[#c0c0c0] p-3 text-black';

type AppShellProps = {
	analytics: Awaited<ReturnType<typeof trackVisitAndGetAnalytics>>;
	highFiveCount: number;
	children: ReactNode;
};

export function AppShell({ analytics, highFiveCount, children }: AppShellProps) {
	const pathname = useLocation({ select: (location) => location.pathname });
	const [drawerOpenedOnPathname, setDrawerOpenedOnPathname] = useState<string | null>(null);
	const isDrawerOpen = drawerOpenedOnPathname === pathname;

	return (
		<div className="flex h-screen gap-4 p-2 font-serif" style={checkerboardBackground}>
			<aside className={cn(sidebarClassName, 'hidden h-full shrink-0 md:block')}>
				<LeftNav />
			</aside>

			{isDrawerOpen && (
				<>
					<div
						className="fixed inset-0 z-40 bg-black/50 md:hidden"
						onClick={() => setDrawerOpenedOnPathname(null)}
						role="presentation"
					/>
					<aside className={cn(sidebarClassName, 'fixed inset-y-0 left-0 z-50 md:hidden')}>
						<LeftNav />
					</aside>
				</>
			)}

			<div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
				<div
					className="bevel-button flex h-12 shrink-0 items-center gap-3 overflow-hidden px-3 md:hidden"
					style={{ background: 'linear-gradient(180deg, #dce2e8 0%, #8e96a0 100%)' }}
				>
					<button
						type="button"
						onClick={() => setDrawerOpenedOnPathname(pathname)}
						className="bevel-button bg-[#c0c0c0] px-2 py-1 font-mono text-base font-bold text-black"
						aria-label="Open navigation"
					>
						&#9776;
					</button>
					<span className="font-mono text-sm font-bold text-black">Ethan MacLeod</span>
				</div>

				<div className="hidden md:block">
					<Header analytics={analytics} highFiveCount={highFiveCount} />
				</div>

				<main
					className={cn(
						'bevel-inset flex-1 overflow-auto bg-[#d4d4d4]',
						!fullscreenPathnames.includes(pathname) && 'p-8'
					)}
				>
					{children}
				</main>

				<MarqueeFooter />
			</div>
		</div>
	);
}

function MarqueeFooter() {
	const now = useNow(60_000);
	const messages = [
		{
			text: `★ Welcome! Last updated: ${mapNullish(now, (date) => format(date, 'd/MM/yyyy')) ?? ''} - Thanks for visiting! ★`,
			className: 'neon-glow text-cyan-400'
		},
		{ text: 'Proudly made by Ethan MacLeod', className: 'text-yellow-300' },
		{ text: 'Best viewed in whatever resolution you currently have', className: 'text-purple-300' },
		{
			text: 'No cookies. But I am actually logging your IP address everytime you visit',
			className: 'text-green-400'
		},
		{ text: 'Est. 2024 - Always under construction', className: 'text-orange-300' }
	];

	return (
		<footer className="bevel-button shrink-0 overflow-hidden bg-gradient-to-t from-gray-900 to-gray-700 py-2 text-white">
			<div className="marquee-track">
				{[...messages, ...messages].map((message, index) => (
					<Fragment key={index}>
						<span className={cn('marquee-item', message.className)}>{message.text}</span>
						<span className="marquee-sep rainbow-text">&gt;&gt;</span>
					</Fragment>
				))}
			</div>
		</footer>
	);
}
