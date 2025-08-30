<script lang="ts">
	import { onMount } from 'svelte';

	let isScreenTooSmall = false;
	let innerWidth = 0;
	const MIN_WIDTH = 975;

	function checkScreenSize() {
		isScreenTooSmall = innerWidth < MIN_WIDTH;
	}
	onMount(() => {
		checkScreenSize();
	});
	$: if (innerWidth) {
		checkScreenSize();
	}
</script>

<svelte:window bind:innerWidth />

{#if isScreenTooSmall}
	<div class="screen-too-small-overlay">
		<div class="crt-static"></div>
		<div class="error-dialog">
			<div class="bevel-button error-window">
				<div class="error-header">
					<span class="error-icon">⚠️</span>
					<span class="error-title">SYSTEM ERROR</span>
					<div class="window-controls">
						<span class="control-button">─</span>
						<span class="control-button">□</span>
						<span class="control-button disabled">✕</span>
					</div>
				</div>
				<div class="error-content">
					<div class="error-message">
						<p class="blink mb-2 font-bold text-red-600">CRITICAL ERROR DETECTED!</p>
						<p class="mb-2">
							In an effort to preserve the artistic integrity of my website, I have decided to not
							make it responsive for mobile. You could always come back on a larger screen...
						</p>
						<p class="mb-2">
							<span class="font-bold">Minimum Required:</span>
							<span class="rainbow-text">{MIN_WIDTH}px</span>
						</p>
						<p class="mb-2">
							<span class="font-bold">Current Resolution:</span>
							<span class="text-red-500">{innerWidth}px</span>
						</p>
						<div class="retro-box mt-3 p-2">
							<p class="text-xs">
								Please resize your browser window, or have another go on a larger screen. I promise
								it's worth it
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.screen-too-small-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
	}

	.error-window {
		background: linear-gradient(135deg, #c0c0c0 0%, #808080 100%);
		border: 2px solid;
		border-top-color: #dfdfdf;
		border-left-color: #dfdfdf;
		border-right-color: #404040;
		border-bottom-color: #404040;
		font-family: 'MS Sans Serif', sans-serif;
		font-size: 11px;
		width: 400px;
		max-width: 90vw;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
	}

	.error-header {
		background: linear-gradient(90deg, #0000ff 0%, #000080 100%);
		color: white;
		padding: 2px 4px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: bold;
		font-size: 11px;
	}

	.error-icon {
		margin-right: 4px;
	}

	.error-title {
		flex-grow: 1;
		text-align: center;
		text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
	}

	.window-controls {
		display: flex;
		gap: 2px;
	}

	.control-button {
		background: #c0c0c0;
		color: #000;
		width: 16px;
		height: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 8px;
		border: 1px solid;
		border-top-color: #dfdfdf;
		border-left-color: #dfdfdf;
		border-right-color: #404040;
		border-bottom-color: #404040;
	}

	.control-button.disabled {
		color: #808080;
	}

	.error-content {
		background: #c0c0c0;
		padding: 16px;
		border: 1px inset #c0c0c0;
	}

	.error-message {
		color: #000;
		line-height: 1.4;
	}
</style>
