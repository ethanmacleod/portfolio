<body class="bg-retroBg text-retroText mx-8 font-mono">
	<!-- Banner -->
	<center>
		<h1 class="blink text-5xl">Welcome to My Site!</h1>
		<hr width="80%" />
	</center>

	<!-- Main layout table -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<!-- Sidebar nav -->
			<td width="180" valign="top" class="border-r-2 border-solid border-gray-400 p-2">
				<nav>
					<ul class="space-y-1">
						<li><a href="index.html" class="underline">Home</a></li>
						<li><a href="about.html" class="underline">About</a></li>
						<li><a href="projects.html" class="underline">Projects</a></li>
						<li><a href="contact.html" class="underline">Contact</a></li>
					</ul>
				</nav>
			</td>

			<!-- Content -->
			<td valign="top" class="p-4">
				<h2 class="marquee text-3xl">Latest News</h2>
				<div id="news" class="mt-4"></div>
				<script id="__INITIAL_DATA__" type="application/json">
						%__DATA__%
				</script>

				<div id="pagination" class="mt-4"></div>

				<h2 class="mt-4 text-2xl">Quick Links</h2>
				<ul>
					<li><a href="#comments" class="underline">Leave a comment</a></li>
					<li><a href="projects.html#project1" class="underline">Project #1</a></li>
				</ul>
			</td>
		</tr>
	</table>

	<!-- Footer -->
	<hr />
	<footer class="p-2 text-center text-sm">
		<p><em>Last updated: May 24 2025</em></p>
		<p><a href="index.html" class="underline">Return to top</a></p>
	</footer>
</body>
