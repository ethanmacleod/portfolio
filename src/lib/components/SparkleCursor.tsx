import { random, range } from 'lodash-es';
import { useEffect } from 'react';

const sparkleCount = 50;
const sparkleLifetimeTicks = 50;
const halfLifeTicks = sparkleLifetimeTicks / 2;
const tickIntervalMs = 40;

type Sparkle = {
	star: HTMLDivElement;
	starArms: HTMLDivElement[];
	dot: HTMLDivElement;
	drift: number;
	starTicksLeft: number;
	starX: number;
	starY: number;
	dotTicksLeft: number;
	dotX: number;
	dotY: number;
};

function createPixel(width: number, height: number) {
	const pixel = document.createElement('div');
	Object.assign(pixel.style, {
		position: 'absolute',
		width: `${width}px`,
		height: `${height}px`,
		overflow: 'hidden',
		pointerEvents: 'none',
		visibility: 'hidden'
	});
	return pixel;
}

function createSparkle(container: HTMLDivElement, index: number): Sparkle {
	const dot = createPixel(3, 3);
	const star = createPixel(5, 5);
	const verticalArm = createPixel(1, 5);
	const horizontalArm = createPixel(5, 1);
	Object.assign(verticalArm.style, { top: '0px', left: '2px', visibility: 'inherit' });
	Object.assign(horizontalArm.style, { top: '2px', left: '0px', visibility: 'inherit' });
	star.append(verticalArm, horizontalArm);
	container.append(dot, star);

	return {
		star,
		starArms: [verticalArm, horizontalArm],
		dot,
		drift: ((index % 5) - 2) / 5,
		starTicksLeft: 0,
		starX: 0,
		starY: 0,
		dotTicksLeft: 0,
		dotX: 0,
		dotY: 0
	};
}

function placeElement(element: HTMLDivElement, x: number, y: number) {
	element.style.left = `${x}px`;
	element.style.top = `${y}px`;
}

function randomSparkleColour() {
	return `hsl(${random(0, 359)}, 100%, ${random(50, 75)}%)`;
}

function spawnStar(sparkle: Sparkle, x: number, y: number) {
	const colour = randomSparkleColour();
	sparkle.starX = x;
	sparkle.starY = y + 1;
	sparkle.starTicksLeft = sparkleLifetimeTicks;
	sparkle.star.style.clipPath = 'none';
	for (const arm of sparkle.starArms) arm.style.backgroundColor = colour;
	sparkle.dot.style.backgroundColor = colour;
	placeElement(sparkle.star, sparkle.starX, sparkle.starY);
	sparkle.star.style.visibility = 'visible';
}

function updateStar(sparkle: Sparkle, viewportHeight: number) {
	sparkle.starTicksLeft--;
	if (sparkle.starTicksLeft === halfLifeTicks) sparkle.star.style.clipPath = 'inset(1px)';

	if (sparkle.starTicksLeft === 0) {
		sparkle.dotTicksLeft = sparkleLifetimeTicks;
		sparkle.dotX = sparkle.starX;
		sparkle.dotY = sparkle.starY;
		Object.assign(sparkle.dot.style, { width: '2px', height: '2px', visibility: 'visible' });
		placeElement(sparkle.dot, sparkle.dotX, sparkle.dotY);
		sparkle.star.style.visibility = 'hidden';
		return;
	}

	sparkle.starY += 1 + Math.random() * 3;
	sparkle.starX += sparkle.drift;
	if (sparkle.starY >= viewportHeight) {
		sparkle.star.style.visibility = 'hidden';
		sparkle.starTicksLeft = 0;
		return;
	}
	placeElement(sparkle.star, sparkle.starX, sparkle.starY);
}

function updateDot(sparkle: Sparkle, viewportHeight: number) {
	sparkle.dotTicksLeft--;
	if (sparkle.dotTicksLeft === halfLifeTicks) {
		Object.assign(sparkle.dot.style, { width: '1px', height: '1px' });
	}

	sparkle.dotY += 1 + Math.random() * 3;
	sparkle.dotX += sparkle.drift;
	if (sparkle.dotTicksLeft === 0 || sparkle.dotY >= viewportHeight) {
		sparkle.dot.style.visibility = 'hidden';
		sparkle.dotTicksLeft = 0;
		return;
	}
	placeElement(sparkle.dot, sparkle.dotX, sparkle.dotY);
}

export function SparkleCursor() {
	useEffect(function startSparkleTrail() {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const container = document.createElement('div');
		Object.assign(container.style, {
			position: 'fixed',
			inset: '0',
			overflow: 'hidden',
			pointerEvents: 'none',
			zIndex: '9999'
		});
		container.setAttribute('aria-hidden', 'true');
		document.body.append(container);

		const sparkles = range(sparkleCount).map((index) => createSparkle(container, index));
		const pointer = { x: 400, y: 300 };
		const lastSpawn = { ...pointer };

		function trackPointer(event: MouseEvent) {
			pointer.x = event.clientX;
			pointer.y = event.clientY;
		}

		function tick() {
			const hasPointerMoved =
				Math.abs(pointer.x - lastSpawn.x) > 1 || Math.abs(pointer.y - lastSpawn.y) > 1;
			if (hasPointerMoved) {
				Object.assign(lastSpawn, pointer);
				const idleSparkle = sparkles.find((sparkle) => sparkle.starTicksLeft === 0);
				if (idleSparkle) spawnStar(idleSparkle, pointer.x, pointer.y);
			}

			for (const sparkle of sparkles) {
				if (sparkle.starTicksLeft > 0) updateStar(sparkle, window.innerHeight);
				if (sparkle.dotTicksLeft > 0) updateDot(sparkle, window.innerHeight);
			}
		}

		window.addEventListener('mousemove', trackPointer);
		const interval = setInterval(tick, tickIntervalMs);

		return () => {
			window.removeEventListener('mousemove', trackPointer);
			clearInterval(interval);
			container.remove();
		};
	}, []);

	return null;
}
