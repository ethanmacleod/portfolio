import type { ReactNode, RefObject } from 'react';
import type { BoidSettings } from '~/lib/boids/simulation';
import { Dial } from '~/lib/components/Dial';
import { decimalPlacesForStep } from '~/lib/utils';

type SettingUpdate = <Key extends keyof BoidSettings>(key: Key, value: BoidSettings[Key]) => void;

type BoidsTerminalProps = {
	controlPanel: ReactNode;
	children: ReactNode;
};

export function BoidsTerminal({ controlPanel, children }: BoidsTerminalProps) {
	return (
		<div className="boids-pip-terminal boids-flicker">
			<div className="boids-screen-container">{children}</div>
			{controlPanel}
		</div>
	);
}

export function BoidsScreen({ canvasRef }: { canvasRef: RefObject<HTMLCanvasElement | null> }) {
	return (
		<>
			<div className="boids-screen-header boids-blink">&gt; BOIDS SIMULATION ACTIVE</div>
			<div className="boids-screen">
				<div className="boids-canvas-wrapper">
					<canvas ref={canvasRef} className="boids-canvas" />
				</div>
			</div>
		</>
	);
}

type BoidsDialPanelProps = {
	settings: BoidSettings;
	onSettingChange: SettingUpdate;
	onBoidCountChange: (boidCount: number) => void;
};

export function BoidsDialPanel({
	settings,
	onSettingChange,
	onBoidCountChange
}: BoidsDialPanelProps) {
	return (
		<div className="boids-dial-panel">
			<BoidsNameplate />
			<div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-3">
				<Dial
					label="Speed"
					min={0.1}
					max={5}
					step={0.2}
					value={settings.maxSpeed}
					onChange={(maxSpeed) => onSettingChange('maxSpeed', maxSpeed)}
				/>
				<Dial
					label="Force"
					min={0.01}
					max={0.5}
					step={0.01}
					value={settings.maxForce}
					onChange={(maxForce) => onSettingChange('maxForce', maxForce)}
				/>
				<Dial
					label="Count"
					min={10}
					max={300}
					value={settings.boidCount}
					onChange={onBoidCountChange}
				/>
			</div>
		</div>
	);
}

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

type BoidsControlPanelProps = {
	settings: BoidSettings;
	fps: number;
	onSettingChange: SettingUpdate;
};

export function BoidsControlPanel({ settings, fps, onSettingChange }: BoidsControlPanelProps) {
	return (
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
							onChange={(event) => onSettingChange(slider.key, event.target.valueAsNumber)}
						/>
						<div className="boids-value-display">
							{settings[slider.key].toFixed(decimalPlacesForStep(slider.step))}
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

const operationGuide = [
	'SPEED: Controls agent velocity',
	'FORCE: Steering strength',
	'COUNT: Population density',
	'Use sliders for behavior tuning'
];

function BoidsNameplate() {
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
