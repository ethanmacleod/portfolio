import { useEffect, useRef, useState } from 'react';
import {
	drawFlock,
	resizeFlock,
	stepFlock,
	type Boid,
	type BoidSettings,
	type Bounds
} from '~/lib/boids/simulation';
import { assert } from '~/lib/utils';

const fpsSampleWindowMs = 500;

function measureCanvas(canvas: HTMLCanvasElement): Bounds {
	const canvasRect = canvas.getBoundingClientRect();
	return { width: canvasRect.width, height: canvasRect.height };
}

export function useBoidsSimulation(settings: BoidSettings) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const boidsRef = useRef<Boid[]>([]);
	const boundsRef = useRef<Bounds>({ width: 0, height: 0 });
	const settingsRef = useRef(settings);
	const [fps, setFps] = useState(60);

	useEffect(
		function syncSettingsToSimulation() {
			settingsRef.current = settings;
		},
		[settings]
	);

	useEffect(function runSimulation() {
		const mountedCanvas = canvasRef.current;
		assert(mountedCanvas, 'boids: canvas is not mounted');
		const canvas: HTMLCanvasElement = mountedCanvas;
		const possibleContext = canvas.getContext('2d');
		assert(possibleContext, 'boids: 2D canvas context is unavailable');
		const context: CanvasRenderingContext2D = possibleContext;

		let pendingBounds: Bounds | null = measureCanvas(canvas);
		const resizeObserver = new ResizeObserver(() => {
			pendingBounds = measureCanvas(canvas);
		});
		resizeObserver.observe(canvas);

		function applyPendingResize() {
			if (!pendingBounds) return;
			const pixelRatio = window.devicePixelRatio;
			canvas.width = Math.round(pendingBounds.width * pixelRatio);
			canvas.height = Math.round(pendingBounds.height * pixelRatio);
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			boundsRef.current = pendingBounds;
			pendingBounds = null;
		}

		applyPendingResize();
		boidsRef.current = resizeFlock(
			[],
			settingsRef.current.boidCount,
			boundsRef.current,
			settingsRef.current.maxSpeed
		);

		let animationFrame = 0;
		let fpsSampleStart = performance.now();
		let framesInSample = 0;

		function renderFrame(now: number) {
			applyPendingResize();
			stepFlock(boidsRef.current, settingsRef.current, boundsRef.current);
			drawFlock(context, boidsRef.current, boundsRef.current);

			framesInSample++;
			const sampleDuration = now - fpsSampleStart;
			if (sampleDuration >= fpsSampleWindowMs) {
				setFps(Math.round((framesInSample * 1000) / sampleDuration));
				fpsSampleStart = now;
				framesInSample = 0;
			}
			animationFrame = requestAnimationFrame(renderFrame);
		}

		animationFrame = requestAnimationFrame(renderFrame);
		return () => {
			cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
		};
	}, []);

	function resizeFlockTo(boidCount: number) {
		boidsRef.current = resizeFlock(
			boidsRef.current,
			boidCount,
			boundsRef.current,
			settingsRef.current.maxSpeed
		);
	}

	return { canvasRef, fps, resizeFlockTo };
}
