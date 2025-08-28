<script lang="ts">
	export let title: string;
	export let text: string;
	export let icon: string;
	export let iconAlt: string;
	export let textColor: string = 'text-black';
</script>

<div
	class="bevel-button flex w-56 flex-col border-5 bg-[#d4d4d4] px-4 py-2 font-[Verdana] text-[13px] leading-tight text-black"
>
	<span class="mb-2 text-left text-[11px] font-bold">{title}</span>
	<div class="flex items-center gap-2">
		<img src={icon} alt={iconAlt} class="h-8 w-8" />
		<span class="text-sm {textColor}">{text}</span>
	</div>
</div>