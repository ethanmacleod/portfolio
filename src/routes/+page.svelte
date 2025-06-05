<script lang="ts">
	import { page } from '$app/state';
	import NewsItem from '$lib/components/ui/news-item.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	page.data.title = 'Home';
</script>

<!-- Content: drop everything one size by adding `text-sm` -->
<div class="flex bg-[#ffffcb] p-4 text-sm">
	<!-- News -->
	<div class="flex-1">
		<h2 class="marquee text-2xl underline">Latest News</h2>
		<table width="80%" border="1" cellpadding="5" cellspacing="0" align="center">
			<tbody>
				{#each data.news as item (item.id)}
					<tr>
						<td class="pl-6">
							<NewsItem {item} />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Widgets -->
	<div class="w-60 border-l-2 border-solid border-gray-400 p-2">
		<h3 class="mb-2 text-xl">Widgets</h3>
		<ul class="space-y-1">
			<li><a href="#" class="text-xs underline">Widget Link 1</a></li>
			<li><a href="#" class="text-xs underline">Widget Link 2</a></li>
		</ul>
	</div>
</div>
