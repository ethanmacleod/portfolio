import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
	drawFlock,
	resizeFlock,
	stepFlock,
	type Boid,
	type BoidSettings,
	type Bounds
} from '~/lib/boids/simulation';
import { Dial } from '~/lib/components/Dial';
import { pageMeta } from '~/lib/site';
import { assert } from '~/lib/utils';

export const Route = createFileRoute('/boids')({
	staticData: {
		heading: {
			title: 'Boids Simulation',
			subtitle:
				"Always thought boids were cool. 3D would be the next plan... let's take a look at D3"
		},
		sitemap: { priority: 0.5, changefreq: 'yearly' },
		isFullscreen: true
	},
	head: () => ({
		meta: pageMeta('Boids - Ethan MacLeod', 'Interactive boids flocking simulation')
	}),
	component: BoidsPage
});

const initialSettings: BoidSettings = {
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

const fpsSampleWindowMs = 500;

type SliderSetting = {
	key: Exclude<keyof BoidSettings, 'maxSpeed' | 'maxForce' | 'boidCount'>;
	label: string;
	min: number;
	max: number;
	step: number;
};

const sliderSettings: SliderSetting[] = [
	{ key: 'separationRadius', label: 'Separation Radius', min: 10, max: 60, step: 1 },
	{ key: 'alignmentRadius', label: 'Alignment Radius', min: 20, max: 100, step: 1 },
	{ key: 'cohesionRadius', label: 'Cohesion Radius', min: 20, max: 100, step: 1 },
	{ key: 'separationWeight', label: 'Separation Weight', min: 0, max: 3, step: 0.1 },
	{ key: 'alignmentWeight', label: 'Alignment Weight', min: 0, max: 3, step: 0.1 },
	{ key: 'cohesionWeight', label: 'Cohesion Weight', min: 0, max: 3, step: 0.1 }
];

const operationGuide = [
	'SPEED: Controls agent velocity',
	'FORCE: Steering strength',
	'COUNT: Population density',
	'Use sliders for behavior tuning'
];

function canvasBounds(canvas: HTMLCanvasElement): Bounds {
	return { width: canvas.width, height: canvas.height };
}

function BoidsPage() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const boidsRef = useRef<Boid[]>([]);
	const [settings, setSettings] = useState(initialSettings);
	const settingsRef = useRef(settings);
	const [fps, setFps] = useState(60);

	useEffect(
		function syncSettingsToSimulation() {
			settingsRef.current = settings;
		},
		[settings]
	);

	useEffect(function runSimulation() {
		const canvas = canvasRef.current;
		assert(canvas, 'boids: canvas is not mounted');
		const possibleContext = canvas.getContext('2d');
		assert(possibleContext, 'boids: 2D canvas context is unavailable');
		const context: CanvasRenderingContext2D = possibleContext;

		const canvasRect = canvas.getBoundingClientRect();
		canvas.width = canvasRect.width;
		canvas.height = canvasRect.height;
		const bounds = canvasBounds(canvas);
		boidsRef.current = resizeFlock(
			[],
			settingsRef.current.boidCount,
			bounds,
			settingsRef.current.maxSpeed
		);

		let animationFrame = 0;
		let fpsSampleStart = performance.now();
		let framesInSample = 0;

		function renderFrame(now: number) {
			stepFlock(boidsRef.current, settingsRef.current, bounds);
			drawFlock(context, boidsRef.current, bounds);

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
		return () => cancelAnimationFrame(animationFrame);
	}, []);

	function updateSetting<Key extends keyof BoidSettings>(key: Key, value: BoidSettings[Key]) {
		setSettings((previousSettings) => ({ ...previousSettings, [key]: value }));
	}

	function updateBoidCount(boidCount: number) {
		const canvas = canvasRef.current;
		assert(canvas, 'boids: canvas is not mounted');
		boidsRef.current = resizeFlock(
			boidsRef.current,
			boidCount,
			canvasBounds(canvas),
			settings.maxSpeed
		);
		updateSetting('boidCount', boidCount);
	}

	return (
		<div className="boids-pip-terminal boids-flicker">
			<div className="boids-screen-container">
				<div className="boids-screen-header boids-blink">&gt; BOIDS SIMULATION ACTIVE</div>

				<div className="boids-screen">
					<div className="boids-canvas-wrapper">
						<canvas ref={canvasRef} className="boids-canvas" />
					</div>
				</div>

				<div className="boids-dial-panel">
					<BoidNameplate />
					<div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-3">
						<Dial
							label="Speed"
							min={0.1}
							max={5}
							step={0.2}
							value={settings.maxSpeed}
							onChange={(maxSpeed) => updateSetting('maxSpeed', maxSpeed)}
						/>
						<Dial
							label="Force"
							min={0.01}
							max={0.5}
							step={0.01}
							value={settings.maxForce}
							onChange={(maxForce) => updateSetting('maxForce', maxForce)}
						/>
						<Dial
							label="Count"
							min={10}
							max={300}
							value={settings.boidCount}
							onChange={updateBoidCount}
						/>
					</div>
				</div>
			</div>

			<div className="boids-control-panel">
				<div className="boids-panel-header">CONTROL PANEL</div>

				{sliderSettings.map((slider) => (
					<div key={slider.key} className="boids-control-group">
						<label className="boids-control-label" htmlFor={slider.key}>
							{slider.label}
						</label>
						<div className="boids-slider-container">
							<input
								type="range"
								id={slider.key}
								className="boids-slider"
								min={slider.min}
								max={slider.max}
								step={slider.step}
								value={settings[slider.key]}
								onChange={(event) => updateSetting(slider.key, event.target.valueAsNumber)}
							/>
							<div className="boids-value-display">
								{settings[slider.key].toFixed(slider.step < 1 ? 1 : 0)}
							</div>
						</div>
					</div>
				))}

				<div className="boids-stats-panel">
					<StatLine label="ACTIVE BOIDS:">{settings.boidCount}</StatLine>
					<StatLine label="FRAME RATE:">{fps} FPS</StatLine>
					<StatLine label="STATUS:">
						<span className="boids-blink">OPERATIONAL</span>
					</StatLine>
				</div>
			</div>
		</div>
	);
}

function StatLine({ label, children }: { label: string; children: ReactNode }) {
	return (
		<div className="boids-stat-line">
			<span>{label}</span>
			<span>{children}</span>
		</div>
	);
}

function BoidNameplate() {
	return (
		<div className="boids-nameplate">
			<div className="boids-screw boids-top-left" />
			<div className="boids-screw boids-top-right" />
			<div className="boids-screw boids-bottom-left" />
			<div className="boids-screw boids-bottom-right" />

			<div className="boids-nameplate-content">
				<div className="boids-manufacturer">MACLEOD ENGINEERING INC</div>
				<div className="boids-model">MODEL: BS-2187</div>
				<div className="boids-serial">S/N: 08051984</div>

				<div className="boids-instructions">
					<div className="boids-instruction-title">OPERATION GUIDE</div>
					{operationGuide.map((instruction) => (
						<div key={instruction} className="boids-instruction-text">
							• {instruction}
						</div>
					))}
				</div>

				<div className="boids-warning">⚠ AUTHORIZED PERSONNEL ONLY</div>
			</div>
		</div>
	);
}
