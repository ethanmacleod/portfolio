<script lang="ts">
	import { page } from '$app/state';

	export let data: {
		news: { id: number; title: string; author: string; created_at: string; content: string }[];
	};

	page.data.title = 'Home';
</script>

<!-- Content -->
<div class="flex bg-[#ffffcb] p-4">
	<!-- News -->
	<div class="flex-1">
		<h2 class="marquee text-3xl">Latest News</h2>
		<table width="80%" border="1" cellpadding="5" cellspacing="0" align="center">
			<tbody>
				{#each data.news as item (item.id)}
					<tr>
						<td>
							<b>{item.title}</b><br />
							<small>by {item.author} on {new Date(item.created_at).toLocaleString()}</small>
							<p>{item.content}</p>
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
			<li><a href="#" class="underline">Widget Link 1</a></li>
			<li><a href="#" class="underline">Widget Link 2</a></li>
		</ul>
	</div>
</div>
