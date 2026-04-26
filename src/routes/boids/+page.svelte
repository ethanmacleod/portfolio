<script lang="ts">
	import './pipboy.css';
	import { onMount } from 'svelte';
	import {
		addVectors,
		BOUNDARY_MARGIN,
		BOUNDARY_WEIGHT,
		createVector,
		distance,
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

	function rule1(boid: Boid, boids: Boid[]): Vector {
		let sum = createVector(0, 0);
		let count = 0;
		for (const other of boids) {
			const d = distance(boid.position, other.position);
			if (d > 0 && d < ALIGNMENT_RADIUS) {
				sum = addVectors(sum, other.velocity);
				count++;
			}
		}
		if (count > 0) {
			sum = multiplyVector(sum, 1 / count);
			sum = normalize(sum);
			sum = multiplyVector(sum, MAX_SPEED);
			let steer = subtractVectors(sum, boid.velocity);
			steer = limit(steer, MAX_FORCE);
			return steer;
		}
		return createVector(0, 0);
	}

	function rule2(boid: Boid, boids: Boid[]): Vector {
		let steer = createVector(0, 0);
		let count = 0;
		for (const other of boids) {
			const d = distance(boid.position, other.position);
			if (d > 0 && d < SEPARATION_RADIUS) {
				let diff = subtractVectors(boid.position, other.position);
				diff = normalize(diff);
				diff = multiplyVector(diff, 1 / d);
				steer = addVectors(steer, diff);
				count++;
			}
		}
		if (count > 0) {
			steer = multiplyVector(steer, 1 / count);
			steer = normalize(steer);
			steer = multiplyVector(steer, MAX_SPEED);
			steer = subtractVectors(steer, boid.velocity);
			steer = limit(steer, MAX_FORCE);
		}
		return steer;
	}

	function rule3(boid: Boid, boids: Boid[]): Vector {
		let sum = createVector(0, 0);
		let count = 0;
		for (const other of boids) {
			const d = distance(boid.position, other.position);
			if (d > 0 && d < COHESION_RADIUS) {
				sum = addVectors(sum, other.position);
				count++;
			}
		}
		if (count > 0) {
			sum = multiplyVector(sum, 1 / count);
			return seek(boid, sum);
		}
		return createVector(0, 0);
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

	function updateBoid(boid: Boid, boids: Boid[]): void {
		const v1 = multiplyVector(rule1(boid, boids), ALIGNMENT_WEIGHT);
		const v2 = multiplyVector(rule2(boid, boids), SEPARATION_WEIGHT);
		const v3 = multiplyVector(rule3(boid, boids), COHESION_WEIGHT);
		const v4 = multiplyVector(boundary(boid), BOUNDARY_WEIGHT);
		boid.acceleration = addVectors(boid.acceleration, v1);
		boid.acceleration = addVectors(boid.acceleration, v2);
		boid.acceleration = addVectors(boid.acceleration, v3);
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

			for (const boid of boids) updateBoid(boid, boids);
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
