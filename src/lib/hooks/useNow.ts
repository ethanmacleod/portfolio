import { useCallback, useSyncExternalStore } from 'react';
import { mapNullish } from '~/lib/utils';

export function useNow(intervalMs: number) {
	const subscribe = useCallback(
		(onTick: () => void) => {
			const interval = setInterval(onTick, intervalMs);
			return () => clearInterval(interval);
		},
		[intervalMs]
	);

	const timestamp = useSyncExternalStore(
		subscribe,
		() => Math.floor(Date.now() / intervalMs) * intervalMs,
		() => null
	);

	return mapNullish(timestamp, (milliseconds) => new Date(milliseconds));
}
