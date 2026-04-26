<script lang="ts">
	import BevelInset from './ui/BevelInset.svelte';

	export let width: string = 'w-56';
	export let className: string = '';
</script>

<BevelInset
	class="flex {width} flex-col overflow-hidden bg-[#d4d4d4] font-[Verdana] text-[13px] leading-tight text-black {className}"
>
	<slot />
</BevelInset>
