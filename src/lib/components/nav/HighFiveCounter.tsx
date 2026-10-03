import { useState } from 'react';
import { giveHighFive } from '~/lib/highFive.functions';
import { formatNumber } from '~/lib/utils';

export function HighFiveCounter({ initialCount }: { initialCount: number }) {
	const [count, setCount] = useState(initialCount);
	const [isPending, setIsPending] = useState(false);

	async function handleHighFive() {
		setIsPending(true);
		setCount((previousCount) => previousCount + 1);
		try {
			const response = await giveHighFive();
			if (response.result === 'counted') setCount(response.count);
			else setCount((previousCount) => previousCount - 1);
		} catch (error) {
			console.error('highfive: failed to give a high five', error);
			setCount((previousCount) => previousCount - 1);
		} finally {
			setIsPending(false);
		}
	}

	return (
		<button
			type="button"
			onClick={handleHighFive}
			disabled={isPending}
			title="Give a high five!"
			aria-label={`Give a high five! ${formatNumber(count)} so far`}
			className="relative flex h-full w-full items-center bg-yellow-300 bg-size-[100%_100%] bg-no-repeat px-6 disabled:cursor-wait"
			style={{ backgroundImage: "url('/gifs/flame-border.webp')" }}
		>
			<span className="flex w-full flex-row justify-between text-xs font-bold text-red-900">
				<span>High Fives:</span>
				<span>{formatNumber(count)}</span>
			</span>
		</button>
	);
}
