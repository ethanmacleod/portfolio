<script lang="ts">
	import { type PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	console.log(data.news);
</script>

<div class="bg-retroBg text-retroText mx-8 font-mono">
	<!-- Banner -->
	<center>
		<h1 class="blink text-5xl">Welcome to My Site!</h1>
		<hr class="w-[80%]" />
	</center>

	<!-- Main layout table -->
	<table class="w-full border-collapse">
		<tbody>
			<tr>
				<!-- Sidebar nav -->
				<td width="180" valign="top" class="border-r-2 border-solid border-gray-400 p-2">
					<nav>
						<ul class="space-y-1">
							<li><a href="/" class="underline">Home</a></li>
							<li><a href="/about" class="underline">About</a></li>
							<li><a href="/projects" class="underline">Projects</a></li>
							<li><a href="/contact" class="underline">Contact</a></li>
						</ul>
					</nav>
				</td>

				<!-- Content -->
				<td valign="top" class="p-4">
					<h2 class="marquee text-3xl">Latest News</h2>
					<div id="news" class="mt-4">
						{#each data.news as news}
							<p>{news.title}</p>
						{/each}
					</div>

					<div id="pagination" class="mt-4"></div>

					<h2 class="mt-4 text-2xl">Quick Links</h2>
					<ul>
						<li><a href="#comments" class="underline">Leave a comment</a></li>
						<li><a href="/projects#project1" class="underline">Project #1</a></li>
					</ul>
				</td>
			</tr>
		</tbody>
	</table>
</div>
