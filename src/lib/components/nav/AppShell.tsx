import { useLocation, useMatches } from '@tanstack/react-router';
import { format } from 'date-fns';
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Analytics } from '~/lib/analytics.functions';
import { Header } from '~/lib/components/nav/Header';
import { LeftNav } from '~/lib/components/nav/LeftNav';
import { useNow } from '~/lib/hooks/useNow';
import { cn, mapNullish } from '~/lib/utils';

const sidebarClassName = 'bevel-button w-[220px] overflow-y-auto bg-win-face p-3 text-black';

type AppShellProps = {
	analytics: Analytics;
	highFiveCount: number;
	children: ReactNode;
};

export function AppShell({ analytics, highFiveCount, children }: AppShellProps) {
	const pathname = useLocation({ select: (location) => location.pathname });
	const [drawerOpenedOnPathname, setDrawerOpenedOnPathname] = useState<string | null>(null);
	const isDrawerOpen = drawerOpenedOnPathname === pathname;
	const drawerRef = useRef<HTMLDialogElement>(null);
	const isFullscreen = useMatches({
		select: (matches) => matches.some((match) => match.staticData.isFullscreen)
	});

	useEffect(
		function syncDrawerDialog() {
			const drawer = drawerRef.current;
			if (!drawer) return;
			if (isDrawerOpen && !drawer.open) drawer.showModal();
			if (!isDrawerOpen && drawer.open) drawer.close();
		},
		[isDrawerOpen]
	);

	return (
		<div className="desktop-checkerboard flex h-screen gap-4 p-2 font-serif">
			<aside className={cn(sidebarClassName, 'hidden h-full shrink-0 md:block')}>
				<LeftNav />
			</aside>

			<dialog
				ref={drawerRef}
				aria-label="Navigation"
				onClose={() => setDrawerOpenedOnPathname(null)}
				className="m-0 h-full max-h-none w-full max-w-none bg-transparent"
			>
				<div className="flex h-full">
					<aside className={cn(sidebarClassName, 'h-full shrink-0')}>
						<LeftNav />
					</aside>
					<button
						type="button"
						aria-label="Close navigation"
						onClick={() => drawerRef.current?.close()}
						className="flex-1 bg-black/50"
					/>
				</div>
			</dialog>

			<div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
				<div className="bevel-button title-bar-chrome flex h-12 shrink-0 items-center gap-3 overflow-hidden px-3 md:hidden">
					<button
						type="button"
						onClick={() => setDrawerOpenedOnPathname(pathname)}
						className="bevel-button bg-win-face px-2 py-1 font-mono text-base font-bold text-black"
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
					className={cn('bevel-inset flex-1 overflow-auto bg-win-surface', !isFullscreen && 'p-8')}
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
			text: `★ Welcome! Last updated: ${mapNullish(now, (date) => format(date, 'd/MM/yyyy')) ?? '--/--/----'} - Thanks for visiting! ★`,
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
				{[...messages, ...messages].map((message, index) => {
					const isLoopCopy = index >= messages.length;
					return (
						<Fragment key={index}>
							<span aria-hidden={isLoopCopy} className={cn('marquee-item', message.className)}>
								{message.text}
							</span>
							<span aria-hidden="true" className="marquee-sep rainbow-text">
								&gt;&gt;
							</span>
						</Fragment>
					);
				})}
			</div>
		</footer>
	);
}
