<script lang="ts">
	import { onMount } from 'svelte';

	let highFiveCount = 0;
	let loading = false;
	let remaining = 5;
	let rateLimitMessage = '';
	let resetTimer: NodeJS.Timeout | null = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/high-five');
			const data = await response.json();
			highFiveCount = data.count;
		} catch (error) {
			console.error('Failed to load high five count:', error);
		}
	});

	async function giveHighFive() {
		if (loading || remaining <= 0) return;

		loading = true;

		const previousCount = highFiveCount;
		highFiveCount++;

		try {
			const response = await fetch('/api/high-five', {
				method: 'POST'
			});

			const data = await response.json();

			if (!response.ok) {
				if (response.status === 429) {
					rateLimitMessage = data.message;
					remaining = 0;
					if (resetTimer) clearInterval(resetTimer);
					let timeLeft = data.resetTime;
					resetTimer = setInterval(() => {
						timeLeft--;
						if (timeLeft <= 0) {
							remaining = 5;
							rateLimitMessage = '';
							if (resetTimer) clearInterval(resetTimer);
						} else {
							rateLimitMessage = `Rate limited! Try again in ${timeLeft}s`;
						}
					}, 1000);
				}
				highFiveCount = previousCount;
			} else {
				highFiveCount = data.count;
				remaining = data.remaining;
			}
		} catch (error) {
			console.error('Failed to give high five:', error);
			highFiveCount = previousCount;
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex flex-row items-center gap-4 bg-zinc-700 p-1 font-mono">
	<span class="text-xs font-bold text-purple-300">HIGH FIVES GIVEN:</span>
	<span class="neon-glow text-sm font-bold text-purple-300">{highFiveCount.toLocaleString()}</span>
	<button
		class="cursor-pointer"
		on:click={giveHighFive}
		disabled={loading || remaining <= 0}
		title="Give a high five!"
	>
		<span class="drop-shadow-lg">🙏</span>
	</button>
</div>
