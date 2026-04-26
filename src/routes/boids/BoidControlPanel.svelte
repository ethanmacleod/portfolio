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
