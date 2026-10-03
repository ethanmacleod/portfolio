import type { ReactNode } from 'react';
import type { Analytics } from '~/lib/analytics.functions';
import { DynamicHeader } from '~/lib/components/nav/DynamicHeader';
import { HighFiveCounter } from '~/lib/components/nav/HighFiveCounter';
import { LiveClock } from '~/lib/components/nav/LiveClock';
import { formatNumber, formatOrdinal } from '~/lib/utils';

type HeaderProps = {
	analytics: Analytics;
	highFiveCount: number;
};

export function Header({ analytics, highFiveCount }: HeaderProps) {
	return (
		<header className="bevel-button title-bar-gradient box-border flex h-20 shrink-0 gap-1 overflow-hidden p-1 pr-2">
			<div className="box-border grid h-full w-[45%] shrink-0 grid-cols-3 gap-3 p-3">
				<HeaderWidget videoSrc="/gifs/globe.webm">
					<span className="text-blue-700">
						You are the{' '}
						<span className="blink font-bold text-orange-700">
							{formatOrdinal(analytics.totalViews)}
						</span>{' '}
						visitor!
					</span>
				</HeaderWidget>
				<HeaderWidget videoSrc="/gifs/skull.webm">
					<span className="text-red-700">
						<span className="font-bold text-red-600">{formatNumber(analytics.badActors)}</span>{' '}
						bots/scrapers
					</span>
				</HeaderWidget>
				<LiveClock />
			</div>

			<div className="bevel-inset my-1 flex w-[25%] shrink-0 flex-col gap-1 overflow-hidden bg-[#c0c0c0] p-1">
				<div className="flex min-h-0 flex-1 gap-1">
					<div className="min-w-0 flex-1 overflow-hidden">
						<HighFiveCounter initialCount={highFiveCount} />
					</div>
					<div className="min-w-0 flex-1 overflow-hidden">
						<video
							autoPlay
							loop
							muted
							playsInline
							aria-hidden="true"
							src="/gifs/rainbow.webm"
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
				<div className="min-h-0 flex-1 overflow-hidden">
					<video
						autoPlay
						loop
						muted
						playsInline
						aria-hidden="true"
						src="/gifs/under_construction.webm"
						className="h-full w-full object-fill"
					/>
				</div>
			</div>

			<div className="bevel-inset my-1 w-[30%] shrink-0 overflow-hidden">
				<DynamicHeader />
			</div>
		</header>
	);
}

type HeaderWidgetProps = {
	videoSrc: string;
	children: ReactNode;
};

function HeaderWidget({ videoSrc, children }: HeaderWidgetProps) {
	return (
		<div className="bevel-inset flex h-full items-center gap-2 bg-white px-2">
			<video
				autoPlay
				loop
				muted
				playsInline
				aria-hidden="true"
				src={videoSrc}
				className="h-5 w-5 shrink-0"
			/>
			<div className="text-xs">{children}</div>
		</div>
	);
}
