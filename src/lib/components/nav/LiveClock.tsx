import { format } from 'date-fns';
import { Inset } from '~/lib/components/ui/Bevel';
import { useNow } from '~/lib/hooks/useNow';
import { mapNullish } from '~/lib/utils';

export function LiveClock() {
	const now = useNow(1000);

	return (
		<Inset tone="screen" className="flex h-full flex-col items-center justify-center px-2">
			<span className="font-mono text-sm leading-none font-bold text-green-400">
				{mapNullish(now, (date) => format(date, 'HH:mm:ss')) ?? '--:--:--'}
			</span>
			<span className="font-mono text-2xs leading-none text-green-600">
				{mapNullish(now, (date) => format(date, 'EEE dd MMM').toUpperCase()) ?? '--- -- ---'}
			</span>
		</Inset>
	);
}
