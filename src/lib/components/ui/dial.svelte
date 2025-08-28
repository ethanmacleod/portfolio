<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = 154;
	export let min = 10;
	export let max = 500;
	export let label = 'Label';
	export let step = 1;

	let knobEl: HTMLDivElement;
	let rotation = 0;
	let barCount = 28;
	let activeArc = 270;
	let isDragging = false;

	function valueToDeg(val: number) {
		return ((val - min) / (max - min)) * activeArc;
	}

	function degToValue(deg: number) {
		const raw = min + (deg / activeArc) * (max - min);
		const stepped = Math.round(raw / step) * step;
		return parseFloat(stepped.toFixed(2));
	}

	function updateRotation(deg: number) {
		deg = Math.max(0, Math.min(270, deg));
		rotation = deg;
		value = degToValue(rotation);
		dispatch('change', { value });
	}

	onMount(() => {
		const knob = knobEl.querySelector('.knob') as HTMLDivElement;
		let startAngle = 0;
		let currentRotation = valueToDeg(value);
		rotation = currentRotation;

		const getAngleFromMouse = (e: MouseEvent) => {
			const rect = knob.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const deltaX = e.clientX - centerX;
			const deltaY = e.clientY - centerY;

			// Calculate as right = 0 deg
			let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
			if (angle < 0) angle += 360;
			return angle;
		};

		const onMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const mouseAngle = getAngleFromMouse(e);
			let targetRotation;

			if (mouseAngle >= 0 && mouseAngle <= 270) {
				targetRotation = mouseAngle;
			} else {
				// Snap to edge
				targetRotation = mouseAngle > 315 ? 0 : 270;
			}

			updateRotation(targetRotation);
		};

		const onMouseUp = () => {
			isDragging = false;
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		knob.addEventListener('mousedown', (e) => {
			e.preventDefault();
			isDragging = true;
			startAngle = getAngleFromMouse(e);
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});

		// Init rotation
		updateRotation(valueToDeg(value));
	});
</script>

<div class="flex flex-col items-center">
	<div class="mb-2 font-mono text-sm text-green-300 drop-shadow-[0_0_4px_rgba(0,255,0,0.7)]">
		{value}
	</div>

	<div bind:this={knobEl} class="relative h-[120px] w-[120px]">
		<!-- "Scale" Bars -->
		{#each Array.from({ length: barCount }) as _, i}
			{@const percent = i / (barCount - 1)}
			{@const deg = percent * activeArc}
			{@const colorHue = 120 - percent * 120}
			{@const barHeight = 4 + percent * 8}
			<div
				class="absolute top-1/2 left-1/2 origin-center"
				style="transform: rotate({deg}deg) translateY(-52px);"
			>
				<div
					class="w-[2px] rounded-full"
					style="
						height: {barHeight}px;
						background: hsl({colorHue}, 100%, 60%);
						box-shadow: 0 0 4px hsl({colorHue}, 100%, 50%);
					"
				></div>
			</div>
		{/each}

		<!-- Knob -->
		<div
			class="knob absolute top-1/2 left-1/2 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
		>
			<div
				class="absolute inset-0 rounded-full border-2 border-green-700 bg-gradient-to-b from-gray-800 to-black shadow-lg"
				style="transform: rotate({rotation}deg);"
			>
				<!-- Notch -->
				<div
					class="absolute top-1 left-1/2 h-4 w-0.5 -translate-x-1/2 rounded-full bg-green-400"
					style="box-shadow: 0 0 6px #00ff41;"
				></div>
			</div>
			<div
				class="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 shadow-[0_0_6px_#00ff41]"
			></div>
		</div>
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 text-center font-mono text-xs text-green-400 drop-shadow-[0_0_3px_rgba(0,255,0,0.6)]"
		>
			{label}
		</div>
	</div>
</div>

<style>
	.knob {
		transition: none;
	}

	.knob > div {
		transition: transform 0.1s ease-out;
	}
</style>
