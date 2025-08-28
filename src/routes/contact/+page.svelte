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

<table class="w-full border-collapse bg-[#ffffcb]">
	<tbody>
		<tr>
			<td class="w-[70%] p-4 align-top">
				<div class="text-left text-2xl font-bold">Latest News</div>
				<hr class="my-2 border-t-2 border-black" />
				<table class="w-full">
					<tbody>
						{#each data.news as item (item.id)}
							<tr>
								<td class="p-2">
									<NewsItem {item} />
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</td>

			<td class="w-[30%] border-l-2 border-gray-500 p-4 align-top">
				<div class="text-center font-serif text-2xl font-bold">Widgets</div>
				<hr class="my-2 border-t border-black" />
				<ul class="list-square ml-5 space-y-1 font-serif text-base">
					<li><a href="/" class="underline">Widget Link 1</a></li>
					<li><a href="/" class="underline">Widget Link 2</a></li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>
