<script lang="ts">
	interface Props {
		name: string;
		label: string;
		icon?: string;
		brandColor?: string;
		index?: number;
	}

	let { name, label, icon, brandColor = '#9333ea', index = 0 }: Props = $props();

	let imageLoaded = $state(false);
	let imageError = $state(false);

	let animationDelay =
		(name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 25) * 0.1;
	let charCode = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
	let scaleVariation = 0.95 + (charCode % 11) / 100;

	function handleImageLoad() {
		imageLoaded = true;
	}

	function handleImageError() {
		imageError = true;
	}
</script>

<div
	class="skill-block transform transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
	style="transform-origin: center; --scale: {scaleVariation}; --wave-delay: {index};"
>
	<div
		class="bevel-button relative flex h-12 w-32 items-center justify-center overflow-hidden p-2 text-center transition-all duration-200"
		style="--brand-color: {brandColor}; background: linear-gradient(135deg, {brandColor}08, {brandColor}15, #e5e7eb);"
		class:hover:shadow-lg={true}
		style:box-shadow="hover:0 10px 15px -3px {brandColor}20, 0 4px 6px -2px {brandColor}10"
		style:border-top-color="hover:{brandColor}30"
		style:border-left-color="hover:{brandColor}30"
	>
		<div
			class="animated-stripe absolute inset-0 opacity-15"
			style="background: repeating-linear-gradient(-45deg, transparent, transparent 30px, {brandColor}, {brandColor} 50px, transparent, transparent 80px); animation-delay: -{animationDelay}s;"
		></div>
		{#if icon && !imageError}
			<img
				src="/skills/{icon}"
				alt={name}
				class="relative z-10 h-full w-full object-contain"
				class:hidden={!imageLoaded}
				class:white-bg-fix={name === 'DJANGO' || name === 'SQL'}
				onload={handleImageLoad}
				onerror={handleImageError}
			/>
		{/if}
		{#if !icon || imageError || !imageLoaded}
			<span class="relative z-10 text-sm font-bold text-gray-700">{name}</span>
		{/if}
	</div>
	{#if label}
		<div class="mt-1 text-center text-xs text-green-300">{label}</div>
	{/if}
</div>

<style>
	@keyframes slide {
		0% {
			transform: translateX(-120px);
		}
		70% {
			transform: translateX(160px);
		}
		100% {
			transform: translateX(160px);
		}
	}

	.animated-stripe {
		animation: slide 2.5s linear infinite;
	}

	.white-bg-fix {
		mix-blend-mode: multiply;
		filter: contrast(1.2) brightness(1.1);
	}

	.skill-block:hover {
		transform: scale(calc(var(--scale) * 1.05)) translateY(0px) !important;
		transition: transform 0.2s ease-in-out;
	}

	.skill-block {
		animation: wave-bounce 8s ease-in-out infinite;
		animation-delay: calc(var(--wave-delay) * 0.4s);
	}

	@keyframes wave-bounce {
		0%,
		90%,
		100% {
			transform: scale(var(--scale)) translateY(0px);
		}
		3% {
			transform: scale(var(--scale)) translateY(-4px);
		}
		6% {
			transform: scale(var(--scale)) translateY(0px);
		}
	}
</style>
