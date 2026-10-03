import { sumBy } from 'lodash-es';
import { useState } from 'react';
import { raisedClassName } from '~/lib/components/ui/Bevel';
import type { Technology } from '~/lib/schema';
import { cn } from '~/lib/utils';

type ImageState = 'loading' | 'loaded' | 'failed';

type SkillBlockProps = Technology & {
	waveIndex: number;
};

export function SkillBlock({
	name,
	icon,
	brandColor = '#9333ea',
	hasWhiteBackground,
	waveIndex
}: SkillBlockProps) {
	const [imageState, setImageState] = useState<ImageState>('loading');

	const nameCharCodeSum = sumBy([...name], (character) => character.charCodeAt(0));
	const stripeDelaySeconds = (nameCharCodeSum % 25) * 0.1;
	const scale = 0.95 + (nameCharCodeSum % 11) / 100;

	function syncAlreadyLoadedImage(image: HTMLImageElement | null) {
		if (!image?.complete) return;
		setImageState(image.naturalWidth > 0 ? 'loaded' : 'failed');
	}

	return (
		<div
			className="skill-block transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
			style={{ '--scale': scale, '--wave-delay': waveIndex }}
		>
			<div
				className={raisedClassName(
					'none',
					'relative flex h-12 w-32 items-center justify-center overflow-hidden p-2 text-center transition-all duration-200 hover:shadow-lg'
				)}
				style={{
					background: `linear-gradient(135deg, ${brandColor}08, ${brandColor}15, #e5e7eb)`
				}}
			>
				<div
					className="skill-block-stripe absolute inset-0 opacity-15"
					style={{
						background: `repeating-linear-gradient(-45deg, transparent, transparent 30px, ${brandColor}, ${brandColor} 50px, transparent, transparent 80px)`,
						animationDelay: `-${stripeDelaySeconds}s`
					}}
				/>
				{icon && imageState !== 'failed' && (
					<img
						ref={syncAlreadyLoadedImage}
						src={`/skills/${icon}`}
						alt={name}
						className={cn(
							'relative z-10 h-full w-full object-contain',
							imageState === 'loading' && 'hidden',
							hasWhiteBackground && 'skill-block-white-background-fix'
						)}
						onLoad={() => setImageState('loaded')}
						onError={() => setImageState('failed')}
					/>
				)}
				{(!icon || imageState !== 'loaded') && (
					<span className="relative z-10 text-sm font-bold text-gray-700">{name}</span>
				)}
			</div>
		</div>
	);
}
