import { format } from 'date-fns';
import { useNow } from '~/lib/hooks/useNow';
import { mapNullish } from '~/lib/utils';

export function LiveClock() {
	const now = useNow(1000);

	return (
		<div className="bevel-inset flex h-full flex-col items-center justify-center bg-black px-2">
			<span className="font-mono text-sm leading-none font-bold text-green-400">
				{mapNullish(now, (date) => format(date, 'HH:mm:ss')) ?? '--:--:--'}
			</span>
			<span className="font-mono text-[10px] leading-none text-green-600">
				{mapNullish(now, (date) => format(date, 'EEE dd MMM').toUpperCase()) ?? '--- -- ---'}
			</span>
		</div>
	);
}
