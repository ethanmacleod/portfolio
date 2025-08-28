<script lang="ts">
	export let width: string = 'w-56';
	export let className: string = '';
</script>

<div
	class="bevel-button flex {width} flex-col border-5 bg-[#d4d4d4] px-4 py-2 font-[Verdana] text-[13px] leading-tight text-black {className}"
>
	<slot />
</div>
