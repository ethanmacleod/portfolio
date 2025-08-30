<script lang="ts">
	import type { Analytics } from '$lib/types';
	import DynamicHeader from '../DynamicHeader.svelte';
	import HighFiveCounter from '../HighFiveCounter.svelte';
	import UnderConstructionGif from '../UnderConstructionGif.svelte';
	import HeaderWidgets from './header-widgets.svelte';

	export let analytics: Analytics;
</script>

<header
	class="bevel-button box-border h-32 overflow-hidden bg-gradient-to-r from-black to-gray-900 text-white"
>
	<table class="h-full w-full table-fixed border-collapse">
		<colgroup>
			<col style="width: 28.57%" />
			<col style="width: 28.57%" />
			<col style="width: 42.86%" />
		</colgroup>
		<tbody>
			<tr class="h-full">
				<td class="h-full p-0 align-top">
					<HeaderWidgets {analytics} />
				</td>
				<td class="h-full p-0 align-top">
					<table class="h-full w-full table-fixed border-collapse" style="table-layout: fixed; height: 100%;">
						<colgroup>
							<col style="width: 50%" />
							<col style="width: 50%" />
						</colgroup>
						<tbody>
							<tr style="height: 25%;">
								<td class="p-0 align-top overflow-hidden" style="height: 25%; max-height: 32px;">
									<div class="w-full overflow-hidden" style="height: 32px;">
										<HighFiveCounter />
									</div>
								</td>
								<td class="overflow-hidden p-0" style="height: 25%; max-height: 32px;">
									<div class="flex w-full items-center" style="height: 32px;">
										<img
											src="/gifs/rainbow.gif"
											alt="Rainbow"
											class="w-full"
											style="height: 32px; object-fit: cover;"
										/>
									</div>
								</td>
							</tr>
							<tr style="height: 25%">
								<td class="overflow-hidden p-0">
									<div class="flex h-full w-full items-center justify-center gap-1 bg-black">
										<img
											src="/gifs/hot_1.gif"
											alt="Hot 1"
											class="max-h-full max-w-[25%] object-contain"
										/>
										<img
											src="/gifs/hot_2.gif"
											alt="Hot 2"
											class="max-h-full max-w-[25%] object-contain"
										/>
										<img
											src="/gifs/hot_3.gif"
											alt="Hot 3"
											class="max-h-full max-w-[25%] object-contain"
										/>
										<img
											src="/gifs/hot_4.gif"
											alt="Hot 4"
											class="max-h-full max-w-[25%] object-contain"
										/>
									</div>
								</td>

								<td class="h-0 overflow-hidden p-0"> </td>
							</tr>
							<tr style="height: 25%">
								<td class="overflow-hidden p-0"> </td>
								<td class="h-0 overflow-hidden p-0"> </td>
							</tr>
							<tr style="height: 25%">
								<td colspan="2" class="p-0 align-top">
									<div class="h-full w-full overflow-hidden">
										<UnderConstructionGif />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
				<td class="h-full p-0 align-top">
					<DynamicHeader />
				</td>
			</tr>
		</tbody>
	</table>
</header>
