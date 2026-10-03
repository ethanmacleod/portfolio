<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let time = '';
	let date = '';
	let interval: ReturnType<typeof setInterval>;

	function tick() {
		const now = new Date();
		time = now.toLocaleTimeString('en-NZ', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
		date = now
			.toLocaleDateString('en-NZ', { weekday: 'short', day: '2-digit', month: 'short' })
			.toUpperCase();
	}

	onMount(() => {
		tick();
		interval = setInterval(tick, 1000);
	});

	onDestroy(() => clearInterval(interval));
</script>

<div class="bevel-inset flex h-full flex-col items-center justify-center bg-black px-2">
	<span class="font-mono text-sm leading-none font-bold text-green-400">{time}</span>
	<span class="font-mono text-[10px] leading-none text-green-600">{date}</span>
</div>
