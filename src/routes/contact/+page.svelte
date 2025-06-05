<div class="bg-retroBg text-retroText mx-8 font-serif">
	<!-- Main content table -->
	<table class="w-full border-collapse" border="0" cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
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
