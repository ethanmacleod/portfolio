<script lang="ts">
	import { onMount } from 'svelte';
	import { BOID_SIZE, HEIGHT, initializeBoids, updateBoid, WIDTH, type Boid } from './boidLogic';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let boids: Boid[] = initializeBoids();

	// Editable params
	let speed = 2;
	let force = 0.03;
	let boidCount = 100;

	function drawBoid(ctx: CanvasRenderingContext2D, boid: Boid): void {
		const angle = Math.atan2(boid.velocity.y, boid.velocity.x);

		ctx.save();
		ctx.translate(boid.position.x, boid.position.y);
		ctx.rotate(angle);

		ctx.beginPath();
		ctx.moveTo(BOID_SIZE * 2, 0);
		ctx.lineTo(-BOID_SIZE, -BOID_SIZE);
		ctx.lineTo(-BOID_SIZE, BOID_SIZE);
		ctx.closePath();

		ctx.fillStyle = '#00ff88';
		ctx.fill();
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = 0.5;
		ctx.stroke();

		ctx.restore();
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;

		let frame: number;
		function loop() {
			for (const boid of boids) updateBoid(boid, boids);
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			for (const boid of boids) drawBoid(ctx, boid);
			frame = requestAnimationFrame(loop);
		}

		loop();
		return () => cancelAnimationFrame(frame);
	});
</script>

<div class="pip-terminal flicker">
	<div class="screen-container">
		<div class="screen-header blink">&gt; BOIDS SIMULATION ACTIVE</div>

		<div class="screen">
			<canvas id="boidsCanvas" bind:this={canvas} width="800" height="600"></canvas>
		</div>

		<!-- Moved dials here -->
		<div class="dial-panel">
			<div class="dial">
				<div class="dial-face">
					<div
						class="dial-indicator"
						style="transform: translateX(-50%) rotate({speed * 90}deg);"
					></div>
				</div>
				<div class="dial-label">SPEED</div>
			</div>

			<div class="dial">
				<div class="dial-face">
					<div
						class="dial-indicator"
						style="transform: translateX(-50%) rotate({force * 3600}deg);"
					></div>
				</div>
				<div class="dial-label">FORCE</div>
			</div>

			<div class="dial">
				<div class="dial-face">
					<div
						class="dial-indicator"
						style="transform: translateX(-50%) rotate({(boidCount - 50) * 3.6}deg);"
					></div>
				</div>
				<div class="dial-label">COUNT</div>
			</div>
		</div>
	</div>

	<div class="control-panel">
		<div class="panel-header">CONTROL PANEL</div>

		{#each [{ id: 'separationRadius', label: 'Separation Radius', min: 10, max: 60, value: 25 }, { id: 'alignmentRadius', label: 'Alignment Radius', min: 20, max: 100, value: 50 }, { id: 'cohesionRadius', label: 'Cohesion Radius', min: 20, max: 100, value: 50 }, { id: 'separationWeight', label: 'Separation Weight', min: 0, max: 3, step: 0.1, value: 1.5 }, { id: 'alignmentWeight', label: 'Alignment Weight', min: 0, max: 3, step: 0.1, value: 1.0 }, { id: 'cohesionWeight', label: 'Cohesion Weight', min: 0, max: 3, step: 0.1, value: 1.0 }] as slider}
			<div class="control-group">
				<label class="control-label" for={slider.id}>{slider.label}</label>
				<div class="slider-container">
					<input
						type="range"
						id={slider.id}
						class="slider"
						min={slider.min}
						max={slider.max}
						step={slider.step ?? 1}
						value={slider.value}
					/>
					<div class="value-display">{slider.value}</div>
				</div>
			</div>
		{/each}

		<div class="stats-panel">
			<div class="stat-line">
				<span>ACTIVE BOIDS:</span>
				<span id="boidCount">100</span>
			</div>
			<div class="stat-line">
				<span>FRAME RATE:</span>
				<span id="frameRate">60 FPS</span>
			</div>
			<div class="stat-line">
				<span>STATUS:</span>
				<span class="blink">OPERATIONAL</span>
			</div>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
	@import './pipboy.css';
</style>
