<script lang="ts">
	export let separationRadius: number;
	export let alignmentRadius: number;
	export let cohesionRadius: number;
	export let separationWeight: number;
	export let alignmentWeight: number;
	export let cohesionWeight: number;
	export let boidCount: number;
	export let fps: number;
</script>

<div class="control-panel">
	<div class="panel-header">CONTROL PANEL</div>

	<div class="control-group">
		<label class="control-label" for="separationRadius">Separation Radius</label>
		<div class="slider-container">
			<input
				type="range"
				id="separationRadius"
				class="slider"
				min="10"
				max="60"
				bind:value={separationRadius}
			/>
			<div class="value-display">{separationRadius}</div>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="alignmentRadius">Alignment Radius</label>
		<div class="slider-container">
			<input
				type="range"
				id="alignmentRadius"
				class="slider"
				min="20"
				max="100"
				bind:value={alignmentRadius}
			/>
			<div class="value-display">{alignmentRadius}</div>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="cohesionRadius">Cohesion Radius</label>
		<div class="slider-container">
			<input
				type="range"
				id="cohesionRadius"
				class="slider"
				min="20"
				max="100"
				bind:value={cohesionRadius}
			/>
			<div class="value-display">{cohesionRadius}</div>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="separationWeight">Separation Weight</label>
		<div class="slider-container">
			<input
				type="range"
				id="separationWeight"
				class="slider"
				min="0"
				max="3"
				step="0.1"
				bind:value={separationWeight}
			/>
			<div class="value-display">{separationWeight}</div>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="alignmentWeight">Alignment Weight</label>
		<div class="slider-container">
			<input
				type="range"
				id="alignmentWeight"
				class="slider"
				min="0"
				max="3"
				step="0.1"
				bind:value={alignmentWeight}
			/>
			<div class="value-display">{alignmentWeight}</div>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="cohesionWeight">Cohesion Weight</label>
		<div class="slider-container">
			<input
				type="range"
				id="cohesionWeight"
				class="slider"
				min="0"
				max="3"
				step="0.1"
				bind:value={cohesionWeight}
			/>
			<div class="value-display">{cohesionWeight}</div>
		</div>
	</div>

	<div class="stats-panel">
		<div class="stat-line">
			<span>ACTIVE BOIDS:</span>
			<span>{boidCount}</span>
		</div>
		<div class="stat-line">
			<span>FRAME RATE:</span>
			<span>{fps} FPS</span>
		</div>
		<div class="stat-line">
			<span>STATUS:</span>
			<span class="blink">OPERATIONAL</span>
		</div>
	</div>
</div>

<style>
	.control-panel {
		background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
		padding: 20px;
		border-left: 2px solid #333;
		overflow-y: auto;
	}

	.panel-header {
		color: #00ff41;
		font-size: 16px;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 1px;
		text-shadow: 0 0 8px #00ff41;
		border-bottom: 1px solid #333;
		padding-bottom: 10px;
	}

	.control-group {
		margin-bottom: 25px;
	}

	.control-label {
		display: block;
		color: #00ff41;
		font-size: 12px;
		margin-bottom: 8px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.slider-container {
		position: relative;
		margin-bottom: 15px;
	}

	.slider {
		width: 100%;
		height: 4px;
		background: #333;
		border-radius: 2px;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		cursor: pointer;
		border: 1px solid #555;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		background: #00ff41;
		border-radius: 50%;
		cursor: pointer;
		box-shadow:
			0 0 8px #00ff41,
			inset 0 0 4px rgba(0, 0, 0, 0.5);
	}

	.slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		background: #00ff41;
		border-radius: 50%;
		cursor: pointer;
		border: none;
		box-shadow:
			0 0 8px #00ff41,
			inset 0 0 4px rgba(0, 0, 0, 0.5);
	}

	.value-display {
		position: absolute;
		right: 0;
		top: -20px;
		font-size: 10px;
		color: #00ff41;
		background: rgba(0, 0, 0, 0.8);
		padding: 2px 6px;
		border-radius: 2px;
		border: 1px solid #333;
	}

	.stats-panel {
		background: rgba(0, 0, 0, 0.8);
		border: 1px solid #333;
		border-radius: 4px;
		padding: 10px;
		margin-top: 20px;
	}

	.stat-line {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		margin-bottom: 5px;
		color: #00ff41;
	}

	.blink {
		animation: blink 2s infinite;
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0.3;
		}
	}
</style>
