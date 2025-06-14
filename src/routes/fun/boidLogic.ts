// Based on the pseudocode from: https://vergenet.net/~conrad/boids/pseudocode.html
// Constants
export const BOID_COUNT = 100;
export const WIDTH = 800;
export const HEIGHT = 600;
export const MAX_SPEED = 2;
export const MAX_FORCE = 0.03;
export const BOID_SIZE = 3;

// Rules
export const SEPARATION_RADIUS = 25;
export const ALIGNMENT_RADIUS = 50;
export const COHESION_RADIUS = 50;

export const SEPARATION_WEIGHT = 1.5;
export const ALIGNMENT_WEIGHT = 1.0;
export const COHESION_WEIGHT = 1.0;

// Boundary forces
export const BOUNDARY_MARGIN = 50;
export const BOUNDARY_WEIGHT = 2.0;

type Vector = {
	x: number;
	y: number;
};

export type Boid = {
	position: Vector;
	velocity: Vector;
	acceleration: Vector;
};

function createVector(x: number, y: number): Vector {
	return { x, y };
}

function addVectors(a: Vector, b: Vector): Vector {
	return { x: a.x + b.x, y: a.y + b.y };
}

function subtractVectors(a: Vector, b: Vector): Vector {
	return { x: a.x - b.x, y: a.y - b.y };
}

function multiplyVector(v: Vector, scalar: number): Vector {
	return { x: v.x * scalar, y: v.y * scalar };
}

function magnitude(v: Vector): number {
	return Math.sqrt(v.x * v.x + v.y * v.y);
}

function normalize(v: Vector): Vector {
	const mag = magnitude(v);
	if (mag === 0) return { x: 0, y: 0 };
	return { x: v.x / mag, y: v.y / mag };
}

function limit(v: Vector, max: number): Vector {
	const mag = magnitude(v);
	if (mag > max) {
		return multiplyVector(normalize(v), max);
	}
	return v;
}

function distance(a: Vector, b: Vector): number {
	return magnitude(subtractVectors(a, b));
}

export function initializeBoids(): Boid[] {
	return Array.from({ length: BOID_COUNT }, () => {
		const angle = Math.random() * 2 * Math.PI;
		return {
			position: {
				x: Math.random() * WIDTH,
				y: Math.random() * HEIGHT
			},
			velocity: {
				x: Math.cos(angle) * (Math.random() * MAX_SPEED),
				y: Math.sin(angle) * (Math.random() * MAX_SPEED)
			},
			acceleration: { x: 0, y: 0 }
		};
	});
}

// Rule 1: Align center of mass with other boids
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

// Rule 2: Maintain a degree of seperation from other boids
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

// Rule 3: Match velocity with other boids
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

// Apply steering force when near a boundary
function boundary(boid: Boid): Vector {
	let steer = createVector(0, 0);
	if (boid.position.x < BOUNDARY_MARGIN) steer.x = MAX_SPEED; // Left
	if (boid.position.x > WIDTH - BOUNDARY_MARGIN) steer.x = -MAX_SPEED; // Right
	if (boid.position.y < BOUNDARY_MARGIN) steer.y = MAX_SPEED; // Top
	if (boid.position.y > HEIGHT - BOUNDARY_MARGIN) steer.y = -MAX_SPEED; // Bottom

	if (steer.x !== 0 || steer.y !== 0) {
		steer = normalize(steer);
		steer = multiplyVector(steer, MAX_SPEED);
		steer = subtractVectors(steer, boid.velocity);
		steer = limit(steer, MAX_FORCE);
	}

	return steer;
}

export function updateBoid(boid: Boid, boids: Boid[]): void {
	// Calculate velocities
	const v1 = multiplyVector(rule1(boid, boids), ALIGNMENT_WEIGHT);
	const v2 = multiplyVector(rule2(boid, boids), SEPARATION_WEIGHT);
	const v3 = multiplyVector(rule3(boid, boids), COHESION_WEIGHT);
	const v4 = multiplyVector(boundary(boid), BOUNDARY_WEIGHT);

	// Apply velocities
	boid.acceleration = addVectors(boid.acceleration, v1);
	boid.acceleration = addVectors(boid.acceleration, v2);
	boid.acceleration = addVectors(boid.acceleration, v3);
	boid.acceleration = addVectors(boid.acceleration, v4);

	// Update velocity and position
	boid.velocity = addVectors(boid.velocity, boid.acceleration);
	boid.velocity = limit(boid.velocity, MAX_SPEED);
	boid.position = addVectors(boid.position, boid.velocity);

	// Reset acceleration
	boid.acceleration = createVector(0, 0);
}
