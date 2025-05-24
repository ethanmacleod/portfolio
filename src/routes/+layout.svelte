<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
</script>

<div class="bg-retroBg text-retroText mx-8 border-2 border-solid border-gray-400 p-4 font-mono">
	<!-- Header -->
	<center>
		<h1 class="blink text-5xl">{page.data.title || 'Welcome'}</h1>
		<hr class="mx-auto w-[80%]" />
	</center>

	<table class="mt-4 w-full border-collapse">
		<tbody>
			<tr>
				<!-- Left nav -->
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

				<!-- Main slot -->
				<td valign="top" class="p-4">
					<slot />
				</td>

				<!-- Right nav -->
				<td width="180" valign="top" class="border-l-2 border-solid border-gray-400 p-2">
					<nav>
						<ul class="space-y-1">
							<li><a href="#" class="underline">Extra Nav 1</a></li>
							<li><a href="#" class="underline">Extra Nav 2</a></li>
						</ul>
					</nav>
				</td>
			</tr>
		</tbody>
	</table>

	<!-- Footer -->
	<hr class="my-4" />
	<footer class="p-2 text-center text-sm">
		<p><em>Last updated: May 24 2025</em></p>
		<p><a href="/" class="underline">Return to top</a></p>
	</footer>
</div>
