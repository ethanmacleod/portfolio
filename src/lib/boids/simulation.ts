// Based on the pseudocode from: https://vergenet.net/~conrad/boids/pseudocode.html

import { range } from 'lodash-es';

const boundaryMargin = 20;
const boundaryWeight = 3;
const boidSize = 3;
const boidColour = '#00ff41';

export type Vector = {
	x: number;
	y: number;
};

export type Boid = {
	position: Vector;
	velocity: Vector;
};

export type Bounds = {
	width: number;
	height: number;
};

export type BoidSettings = {
	maxSpeed: number;
	maxForce: number;
	boidCount: number;
	separationRadius: number;
	alignmentRadius: number;
	cohesionRadius: number;
	separationWeight: number;
	alignmentWeight: number;
	cohesionWeight: number;
};

export const initialBoidSettings: BoidSettings = {
	maxSpeed: 2,
	maxForce: 0.03,
	boidCount: 100,
	separationRadius: 25,
	alignmentRadius: 50,
	cohesionRadius: 50,
	separationWeight: 1.5,
	alignmentWeight: 1,
	cohesionWeight: 1
};

const zeroVector: Vector = { x: 0, y: 0 };

function addVectors(first: Vector, second: Vector): Vector {
	return { x: first.x + second.x, y: first.y + second.y };
}

function subtractVectors(first: Vector, second: Vector): Vector {
	return { x: first.x - second.x, y: first.y - second.y };
}

function multiplyVector(vector: Vector, scalar: number): Vector {
	return { x: vector.x * scalar, y: vector.y * scalar };
}

function magnitude(vector: Vector): number {
	return Math.hypot(vector.x, vector.y);
}

function normalize(vector: Vector): Vector {
	const length = magnitude(vector);
	if (length === 0) return zeroVector;
	return { x: vector.x / length, y: vector.y / length };
}

function limit(vector: Vector, max: number): Vector {
	return magnitude(vector) > max ? multiplyVector(normalize(vector), max) : vector;
}

function steerTowards(desiredDirection: Vector, boid: Boid, settings: BoidSettings): Vector {
	const desiredVelocity = multiplyVector(normalize(desiredDirection), settings.maxSpeed);
	return limit(subtractVectors(desiredVelocity, boid.velocity), settings.maxForce);
}

export function createBoid(bounds: Bounds, maxSpeed: number): Boid {
	const angle = Math.random() * 2 * Math.PI;
	const speed = Math.random() * maxSpeed;
	return {
		position: { x: Math.random() * bounds.width, y: Math.random() * bounds.height },
		velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }
	};
}

export function resizeFlock(boids: Boid[], count: number, bounds: Bounds, maxSpeed: number) {
	if (count <= boids.length) return boids.slice(0, count);
	return [...boids, ...range(count - boids.length).map(() => createBoid(bounds, maxSpeed))];
}

function gridCellKey(position: Vector, cellSize: number, columnCount: number) {
	return Math.floor(position.x / cellSize) + Math.floor(position.y / cellSize) * columnCount;
}

function buildGrid(boids: Boid[], cellSize: number, columnCount: number) {
	const grid = new Map<number, Boid[]>();
	for (const boid of boids) {
		const key = gridCellKey(boid.position, cellSize, columnCount);
		const cell = grid.get(key);
		if (cell) cell.push(boid);
		else grid.set(key, [boid]);
	}
	return grid;
}

function getNeighbours(
	boid: Boid,
	grid: Map<number, Boid[]>,
	cellSize: number,
	columnCount: number
): Boid[] {
	const cellX = Math.floor(boid.position.x / cellSize);
	const cellY = Math.floor(boid.position.y / cellSize);
	return [-1, 0, 1].flatMap((offsetX) =>
		[-1, 0, 1].flatMap(
			(offsetY) => grid.get(cellX + offsetX + (cellY + offsetY) * columnCount) ?? []
		)
	);
}

function flockingForce(boid: Boid, neighbours: Boid[], settings: BoidSettings): Vector {
	const separationRadiusSquared = settings.separationRadius ** 2;
	const alignmentRadiusSquared = settings.alignmentRadius ** 2;
	const cohesionRadiusSquared = settings.cohesionRadius ** 2;

	let separationSum = zeroVector;
	let separationCount = 0;
	let velocitySum = zeroVector;
	let alignmentCount = 0;
	let positionSum = zeroVector;
	let cohesionCount = 0;

	for (const other of neighbours) {
		const offset = subtractVectors(other.position, boid.position);
		const distanceSquared = offset.x ** 2 + offset.y ** 2;
		if (distanceSquared === 0) continue;

		if (distanceSquared < separationRadiusSquared) {
			separationSum = subtractVectors(separationSum, multiplyVector(offset, 1 / distanceSquared));
			separationCount++;
		}
		if (distanceSquared < alignmentRadiusSquared) {
			velocitySum = addVectors(velocitySum, other.velocity);
			alignmentCount++;
		}
		if (distanceSquared < cohesionRadiusSquared) {
			positionSum = addVectors(positionSum, other.position);
			cohesionCount++;
		}
	}

	const separation =
		separationCount > 0
			? steerTowards(multiplyVector(separationSum, 1 / separationCount), boid, settings)
			: zeroVector;
	const alignment =
		alignmentCount > 0
			? steerTowards(multiplyVector(velocitySum, 1 / alignmentCount), boid, settings)
			: zeroVector;
	const cohesion =
		cohesionCount > 0
			? steerTowards(
					subtractVectors(multiplyVector(positionSum, 1 / cohesionCount), boid.position),
					boid,
					settings
				)
			: zeroVector;

	return addVectors(
		addVectors(
			multiplyVector(separation, settings.separationWeight),
			multiplyVector(alignment, settings.alignmentWeight)
		),
		multiplyVector(cohesion, settings.cohesionWeight)
	);
}

function boundaryForce(boid: Boid, bounds: Bounds, settings: BoidSettings): Vector {
	const awayFromEdge = {
		x:
			boid.position.x < boundaryMargin
				? 1
				: boid.position.x > bounds.width - boundaryMargin
					? -1
					: 0,
		y:
			boid.position.y < boundaryMargin
				? 1
				: boid.position.y > bounds.height - boundaryMargin
					? -1
					: 0
	};
	if (awayFromEdge.x === 0 && awayFromEdge.y === 0) return zeroVector;
	return multiplyVector(steerTowards(awayFromEdge, boid, settings), boundaryWeight);
}

export function stepFlock(boids: Boid[], settings: BoidSettings, bounds: Bounds) {
	const cellSize = Math.max(
		settings.separationRadius,
		settings.alignmentRadius,
		settings.cohesionRadius
	);
	const columnCount = Math.ceil(bounds.width / cellSize) + 1;
	const grid = buildGrid(boids, cellSize, columnCount);

	for (const boid of boids) {
		const neighbours = getNeighbours(boid, grid, cellSize, columnCount);
		const acceleration = addVectors(
			flockingForce(boid, neighbours, settings),
			boundaryForce(boid, bounds, settings)
		);
		boid.velocity = limit(addVectors(boid.velocity, acceleration), settings.maxSpeed);
		boid.position = addVectors(boid.position, boid.velocity);
	}
}

export function drawFlock(context: CanvasRenderingContext2D, boids: Boid[], bounds: Bounds) {
	context.fillStyle = 'black';
	context.fillRect(0, 0, bounds.width, bounds.height);
	context.fillStyle = boidColour;
	context.strokeStyle = boidColour;
	context.shadowColor = boidColour;
	context.lineWidth = 0.5;

	for (const boid of boids) {
		context.save();
		context.translate(boid.position.x, boid.position.y);
		context.rotate(Math.atan2(boid.velocity.y, boid.velocity.x));
		context.beginPath();
		context.moveTo(boidSize * 2, 0);
		context.lineTo(-boidSize, -boidSize);
		context.lineTo(-boidSize, boidSize);
		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	}
}
