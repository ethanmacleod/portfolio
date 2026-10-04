import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { initialBoidSettings, type BoidSettings } from '~/lib/boids/simulation';
import { useBoidsSimulation } from '~/lib/boids/useBoidsSimulation';
import {
	BoidsControlPanel,
	BoidsDialPanel,
	BoidsScreen,
	BoidsTerminal
} from '~/lib/components/BoidsTerminal';
import { pageMeta } from '~/lib/site';

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

function BoidsPage() {
	const [settings, setSettings] = useState(initialBoidSettings);
	const { canvasRef, fps, resizeFlockTo } = useBoidsSimulation(settings);

	function updateSetting<Key extends keyof BoidSettings>(key: Key, value: BoidSettings[Key]) {
		setSettings((previousSettings) => ({ ...previousSettings, [key]: value }));
	}

	function updateBoidCount(boidCount: number) {
		resizeFlockTo(boidCount);
		updateSetting('boidCount', boidCount);
	}

	return (
		<BoidsTerminal
			controlPanel={
				<BoidsControlPanel settings={settings} fps={fps} onSettingChange={updateSetting} />
			}
		>
			<BoidsScreen canvasRef={canvasRef} />
			<BoidsDialPanel
				settings={settings}
				onSettingChange={updateSetting}
				onBoidCountChange={updateBoidCount}
			/>
		</BoidsTerminal>
	);
}
