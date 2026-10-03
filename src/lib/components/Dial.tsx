import { clamp, range } from 'lodash-es';
import { useId, type PointerEvent } from 'react';

const activeArcDegrees = 270;
const snapToStartAboveDegrees = 315;
const tickCount = 28;

type DialProps = {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (value: number) => void;
};

export function Dial({ label, value, min, max, step = 1, onChange }: DialProps) {
	const inputId = useId();
	const decimalPlaces = Math.max(0, -Math.floor(Math.log10(step)));
	const rotationDegrees = ((value - min) / (max - min)) * activeArcDegrees;

	function snapToStep(rawValue: number) {
		const steppedValue = Math.round(rawValue / step) * step;
		return Number(clamp(steppedValue, min, max).toFixed(decimalPlaces));
	}

	function valueFromPointer(event: PointerEvent<HTMLDivElement>) {
		const knobRect = event.currentTarget.getBoundingClientRect();
		const centerX = knobRect.left + knobRect.width / 2;
		const centerY = knobRect.top + knobRect.height / 2;
		const pointerDegrees =
			(Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI) + 360) % 360;

		const knobDegrees =
			pointerDegrees <= activeArcDegrees
				? pointerDegrees
				: pointerDegrees > snapToStartAboveDegrees
					? 0
					: activeArcDegrees;
		return snapToStep(min + (knobDegrees / activeArcDegrees) * (max - min));
	}

	function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
		event.preventDefault();
		event.currentTarget.setPointerCapture(event.pointerId);
		onChange(valueFromPointer(event));
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
		onChange(valueFromPointer(event));
	}

	return (
		<div className="flex flex-col items-center">
			<div className="mb-2 font-mono text-sm text-green-300 drop-shadow-[0_0_4px_rgba(0,255,0,0.7)]">
				{value.toFixed(decimalPlaces)}
			</div>

			<div className="relative h-[120px] w-[120px]">
				{range(tickCount).map((tickIndex) => {
					const percent = tickIndex / (tickCount - 1);
					const hue = 120 - percent * 120;
					return (
						<div
							key={tickIndex}
							className="absolute top-1/2 left-1/2 origin-center"
							style={{ transform: `rotate(${percent * activeArcDegrees}deg) translateY(-52px)` }}
						>
							<div
								className="w-[2px] rounded-full"
								style={{
									height: `${4 + percent * 8}px`,
									background: `hsl(${hue}, 100%, 60%)`,
									boxShadow: `0 0 4px hsl(${hue}, 100%, 50%)`
								}}
							/>
						</div>
					);
				})}

				<input
					id={inputId}
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(event) => onChange(snapToStep(event.target.valueAsNumber))}
					className="peer sr-only"
				/>
				<div
					aria-hidden="true"
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					className="absolute top-1/2 left-1/2 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-none rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-green-400"
				>
					<div
						className="absolute inset-0 rounded-full border-2 border-green-700 bg-gradient-to-b from-gray-800 to-black shadow-lg transition-transform duration-100 ease-out"
						style={{ transform: `rotate(${rotationDegrees}deg)` }}
					>
						<div className="absolute top-1 left-1/2 h-4 w-0.5 -translate-x-1/2 rounded-full bg-green-400 shadow-[0_0_6px_#00ff41]" />
					</div>
					<div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 shadow-[0_0_6px_#00ff41]" />
				</div>
				<label
					htmlFor={inputId}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 text-center font-mono text-xs text-green-400 drop-shadow-[0_0_3px_rgba(0,255,0,0.6)]"
				>
					{label}
				</label>
			</div>
		</div>
	);
}
