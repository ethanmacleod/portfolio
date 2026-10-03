<div class="nameplate">
	<div class="screw top-left"></div>
	<div class="screw top-right"></div>
	<div class="screw bottom-left"></div>
	<div class="screw bottom-right"></div>

	<div class="nameplate-content">
		<div class="manufacturer">MACLEOD ENGINEERING INC</div>
		<div class="model">MODEL: BS-2187</div>
		<div class="serial">S/N: 08051984</div>

		<div class="instructions">
			<div class="instruction-title">OPERATION GUIDE</div>
			<div class="instruction-text">• SPEED: Controls agent velocity</div>
			<div class="instruction-text">• FORCE: Steering strength</div>
			<div class="instruction-text">• COUNT: Population density</div>
			<div class="instruction-text">• Use sliders for behavior tuning</div>
		</div>

		<div class="warning">⚠ AUTHORIZED PERSONNEL ONLY</div>
	</div>
</div>

<style>
	.nameplate {
		position: relative;
		background: linear-gradient(
			135deg,
			#c0c0c0 0%,
			#a8a8a8 25%,
			#d0d0d0 50%,
			#b8b8b8 75%,
			#c8c8c8 100%
		);
		border: 2px solid #888;
		border-radius: 4px;
		padding: 12px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			inset 0 -1px 0 rgba(0, 0, 0, 0.3),
			0 2px 4px rgba(0, 0, 0, 0.5);
		font-family: 'Courier New', monospace;
		min-height: 180px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nameplate::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			45deg,
			transparent 30%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 70%
		);
		border-radius: 2px;
		pointer-events: none;
	}

	.screw {
		position: absolute;
		width: 8px;
		height: 8px;
		background: radial-gradient(circle, #666 0%, #444 40%, #222 100%);
		border-radius: 50%;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			inset 0 -1px 0 rgba(0, 0, 0, 0.5),
			0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.screw::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 4px;
		height: 0.5px;
		background: rgba(0, 0, 0, 0.6);
		transform: translate(-50%, -50%);
		box-shadow: 0 -0.5px 0 rgba(255, 255, 255, 0.2);
	}

	.screw::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0.5px;
		height: 4px;
		background: rgba(0, 0, 0, 0.6);
		transform: translate(-50%, -50%);
		box-shadow: 0.5px 0 0 rgba(255, 255, 255, 0.2);
	}

	.top-left {
		top: 4px;
		left: 4px;
	}
	.top-right {
		top: 4px;
		right: 4px;
	}
	.bottom-left {
		bottom: 4px;
		left: 4px;
	}
	.bottom-right {
		bottom: 4px;
		right: 4px;
	}

	.nameplate-content {
		text-align: center;
		color: #222;
		text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
		z-index: 1;
		position: relative;
	}

	.manufacturer {
		font-size: 10px;
		font-weight: bold;
		margin-bottom: 4px;
		letter-spacing: 1px;
	}

	.model {
		font-size: 8px;
		margin-bottom: 2px;
		font-weight: bold;
	}

	.serial {
		font-size: 7px;
		margin-bottom: 8px;
		opacity: 0.8;
	}

	.instructions {
		margin: 8px 0;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 6px 0;
	}

	.instruction-title {
		font-size: 7px;
		font-weight: bold;
		margin-bottom: 4px;
		text-decoration: underline;
	}

	.instruction-text {
		font-size: 6px;
		line-height: 1.2;
		margin-bottom: 1px;
		text-align: left;
	}

	.warning {
		font-size: 6px;
		margin-top: 6px;
		color: #444;
		font-weight: bold;
	}
</style>
