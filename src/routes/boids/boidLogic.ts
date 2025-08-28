// Based on the pseudocode from: https://vergenet.net/~conrad/boids/pseudocode.html

// Boundary forces
export const BOUNDARY_MARGIN = 20;
export const BOUNDARY_WEIGHT = 3.0;

export type Vector = {
	x: number;
	y: number;
};

export type Boid = {
	position: Vector;
	velocity: Vector;
	acceleration: Vector;
};

export function createVector(x: number, y: number): Vector {
	return { x, y };
}

export function addVectors(a: Vector, b: Vector): Vector {
	return { x: a.x + b.x, y: a.y + b.y };
}

export function subtractVectors(a: Vector, b: Vector): Vector {
	return { x: a.x - b.x, y: a.y - b.y };
}

export function multiplyVector(v: Vector, scalar: number): Vector {
	return { x: v.x * scalar, y: v.y * scalar };
}

export function magnitude(v: Vector): number {
	return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v: Vector): Vector {
	const mag = magnitude(v);
	if (mag === 0) return { x: 0, y: 0 };
	return { x: v.x / mag, y: v.y / mag };
}

export function limit(v: Vector, max: number): Vector {
	const mag = magnitude(v);
	if (mag > max) {
		return multiplyVector(normalize(v), max);
	}
	return v;
}

export function distance(a: Vector, b: Vector): number {
	return magnitude(subtractVectors(a, b));
}
