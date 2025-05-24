<div class="bg-retroBg text-retroText mx-8 font-mono">
	<header class="my-6 text-center">
		<h1 class="blink text-4xl">Get in Touch</h1>
		<hr class="mx-auto w-[80%]" />
	</header>

	<!-- Main content table -->
	<table class="w-full border-collapse" border="0" cellspacing="0" cellpadding="0">
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

				<!-- Main section -->
				<td valign="top" class="p-4">
					<h2 class="text-2xl">Leave a Message</h2>
					<form action="/comments" method="POST">
						<p>
							<label>
								Name:<br />
								<input type="text" name="name" size="30" />
							</label>
						</p>
						<p>
							<label>
								Comment:<br />
								<textarea name="text" rows="5" cols="40"></textarea>
							</label>
						</p>
						<p><input type="submit" value="Post Comment" /></p>
					</form>
				</td>
			</tr>
		</tbody>
	</table>
</div>
