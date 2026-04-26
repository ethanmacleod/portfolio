<script lang="ts">
	import './pipboy.css';
	import { onMount } from 'svelte';
	import {
		addVectors,
		BOUNDARY_MARGIN,
		BOUNDARY_WEIGHT,
		createVector,
		limit,
		multiplyVector,
		normalize,
		subtractVectors,
		type Boid,
		type Vector
	} from './boidLogic';
	import Dial from '$lib/components/ui/dial.svelte';
	import BoidNameplate from './BoidNameplate.svelte';
	import BoidControlPanel from './BoidControlPanel.svelte';

	let MAX_SPEED = 2;
	let MAX_FORCE = 0.03;
	let BOID_SIZE = 3;
	let BOID_COUNT = 100;

	let SEPARATION_RADIUS = 25;
	let ALIGNMENT_RADIUS = 50;
	let COHESION_RADIUS = 50;

	let SEPARATION_WEIGHT = 1.5;
	let ALIGNMENT_WEIGHT = 1.0;
	let COHESION_WEIGHT = 1.0;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let boids: Boid[] = [];

	let lastFrameTime = performance.now();
	let fps = 60;

	export function addBoid(): Boid {
		const angle = Math.random() * 2 * Math.PI;
		return {
			position: {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height
			},
			velocity: {
				x: Math.cos(angle) * (Math.random() * MAX_SPEED),
				y: Math.sin(angle) * (Math.random() * MAX_SPEED)
			},
			acceleration: { x: 0, y: 0 }
		};
	}

	function initializeBoids(): Boid[] {
		return Array.from({ length: BOID_COUNT }, () => addBoid());
	}

	function buildGrid(cellSize: number): Map<number, number[]> {
		const cols = Math.ceil(canvas.width / cellSize) + 1;
		const grid = new Map<number, number[]>();
		for (let i = 0; i < boids.length; i++) {
			const { x, y } = boids[i].position;
			const key = Math.floor(x / cellSize) + Math.floor(y / cellSize) * cols;
			const cell = grid.get(key);
			if (cell) cell.push(i);
			else grid.set(key, [i]);
		}
		return grid;
	}

	function getNeighbors(boid: Boid, grid: Map<number, number[]>, cellSize: number): number[] {
		const cols = Math.ceil(canvas.width / cellSize) + 1;
		const cx = Math.floor(boid.position.x / cellSize);
		const cy = Math.floor(boid.position.y / cellSize);
		const neighbors: number[] = [];
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				const cell = grid.get(cx + dx + (cy + dy) * cols);
				if (cell) {
					for (const idx of cell) neighbors.push(idx);
				}
			}
		}
		return neighbors;
	}

	function computeForces(boid: Boid, neighbors: number[]): [Vector, Vector, Vector] {
		let alignSumX = 0,
			alignSumY = 0,
			alignCount = 0;
		let sepX = 0,
			sepY = 0,
			sepCount = 0;
		let cohSumX = 0,
			cohSumY = 0,
			cohCount = 0;

		const sepR2 = SEPARATION_RADIUS * SEPARATION_RADIUS;
		const aliR2 = ALIGNMENT_RADIUS * ALIGNMENT_RADIUS;
		const cohR2 = COHESION_RADIUS * COHESION_RADIUS;

		for (const idx of neighbors) {
			const other = boids[idx];
			const dx = other.position.x - boid.position.x;
			const dy = other.position.y - boid.position.y;
			const d2 = dx * dx + dy * dy;
			if (d2 === 0) continue;

			if (d2 < sepR2) {
				sepX += -dx / d2;
				sepY += -dy / d2;
				sepCount++;
			}
			if (d2 < aliR2) {
				alignSumX += other.velocity.x;
				alignSumY += other.velocity.y;
				alignCount++;
			}
			if (d2 < cohR2) {
				cohSumX += other.position.x;
				cohSumY += other.position.y;
				cohCount++;
			}
		}

		let alignment = createVector(0, 0);
		if (alignCount > 0) {
			let avg = normalize({ x: alignSumX / alignCount, y: alignSumY / alignCount });
			avg = multiplyVector(avg, MAX_SPEED);
			alignment = limit(subtractVectors(avg, boid.velocity), MAX_FORCE);
		}

		let separation = createVector(0, 0);
		if (sepCount > 0) {
			let steer = normalize({ x: sepX / sepCount, y: sepY / sepCount });
			steer = multiplyVector(steer, MAX_SPEED);
			steer = subtractVectors(steer, boid.velocity);
			separation = limit(steer, MAX_FORCE);
		}

		let cohesion = createVector(0, 0);
		if (cohCount > 0) {
			cohesion = seek(boid, { x: cohSumX / cohCount, y: cohSumY / cohCount });
		}

		return [alignment, separation, cohesion];
	}

	function seek(boid: Boid, target: Vector): Vector {
		let desired = subtractVectors(target, boid.position);
		desired = normalize(desired);
		desired = multiplyVector(desired, MAX_SPEED);
		let steer = subtractVectors(desired, boid.velocity);
		steer = limit(steer, MAX_FORCE);
		return steer;
	}

	function boundary(boid: Boid): Vector {
		let steer = createVector(0, 0);
		if (boid.position.x < BOUNDARY_MARGIN) steer.x = MAX_SPEED;
		if (boid.position.x > canvas.width - BOUNDARY_MARGIN) steer.x = -MAX_SPEED;
		if (boid.position.y < BOUNDARY_MARGIN) steer.y = MAX_SPEED;
		if (boid.position.y > canvas.height - BOUNDARY_MARGIN) steer.y = -MAX_SPEED;
		if (steer.x !== 0 || steer.y !== 0) {
			steer = normalize(steer);
			steer = multiplyVector(steer, MAX_SPEED);
			steer = subtractVectors(steer, boid.velocity);
			steer = limit(steer, MAX_FORCE);
		}
		return steer;
	}

	function updateBoid(boid: Boid, neighbors: number[]): void {
		const [alignment, separation, cohesion] = computeForces(boid, neighbors);
		const v4 = multiplyVector(boundary(boid), BOUNDARY_WEIGHT);
		boid.acceleration = addVectors(boid.acceleration, multiplyVector(alignment, ALIGNMENT_WEIGHT));
		boid.acceleration = addVectors(
			boid.acceleration,
			multiplyVector(separation, SEPARATION_WEIGHT)
		);
		boid.acceleration = addVectors(boid.acceleration, multiplyVector(cohesion, COHESION_WEIGHT));
		boid.acceleration = addVectors(boid.acceleration, v4);
		boid.velocity = addVectors(boid.velocity, boid.acceleration);
		boid.velocity = limit(boid.velocity, MAX_SPEED);
		boid.position = addVectors(boid.position, boid.velocity);
		boid.acceleration = createVector(0, 0);
	}

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
		ctx.shadowColor = '#00ff41';
		ctx.fillStyle = '#00ff41';
		ctx.fill();
		ctx.strokeStyle = '#00ff41';
		ctx.lineWidth = 0.5;
		ctx.stroke();
		ctx.restore();
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
		boids = initializeBoids();

		let frame: number;
		function loop() {
			const now = performance.now();
			const delta = now - lastFrameTime;
			fps = Math.round(1000 / delta);
			lastFrameTime = now;

			const cellSize = Math.max(SEPARATION_RADIUS, ALIGNMENT_RADIUS, COHESION_RADIUS);
			const grid = buildGrid(cellSize);
			for (const boid of boids) updateBoid(boid, getNeighbors(boid, grid, cellSize));
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			for (const boid of boids) drawBoid(ctx, boid);
			frame = requestAnimationFrame(loop);
		}

		loop();
		return () => cancelAnimationFrame(frame);
	});

	function updateMaxSpeed(val: number) {
		MAX_SPEED = val;
	}
	function updateMaxForce(val: number) {
		MAX_FORCE = val;
	}
	function updateBoidCount(val: number) {
		const newCount = Math.round(val);
		if (newCount > boids.length) {
			const toAdd = newCount - boids.length;
			boids = [...boids, ...Array.from({ length: toAdd }, addBoid)];
		} else if (newCount < boids.length) {
			boids = boids.slice(0, newCount);
		}
		BOID_COUNT = newCount;
	}
</script>

<div class="pip-terminal flicker">
	<div class="screen-container">
		<div class="screen-header blink">&gt; BOIDS SIMULATION ACTIVE</div>

		<div class="screen">
			<div class="canvas-wrapper">
				<canvas id="boidsCanvas" bind:this={canvas}></canvas>
			</div>
		</div>

		<div class="dial-panel">
			<BoidNameplate />
			<div class="controls grid grid-cols-1 gap-6 p-4 sm:grid-cols-3">
				<Dial
					label="Speed"
					min={0.1}
					step={0.2}
					max={5}
					bind:value={MAX_SPEED}
					on:change={(e) => updateMaxSpeed(e.detail.value)}
				/>
				<Dial
					label="Force"
					min={0.01}
					step={0.01}
					max={0.5}
					bind:value={MAX_FORCE}
					on:change={(e) => updateMaxForce(e.detail.value)}
				/>
				<Dial
					label="Count"
					min={10}
					max={300}
					bind:value={BOID_COUNT}
					on:change={(e) => updateBoidCount(e.detail.value)}
				/>
			</div>
		</div>
	</div>

	<BoidControlPanel
		bind:separationRadius={SEPARATION_RADIUS}
		bind:alignmentRadius={ALIGNMENT_RADIUS}
		bind:cohesionRadius={COHESION_RADIUS}
		bind:separationWeight={SEPARATION_WEIGHT}
		bind:alignmentWeight={ALIGNMENT_WEIGHT}
		bind:cohesionWeight={COHESION_WEIGHT}
		boidCount={boids.length}
		{fps}
	/>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
</style>
