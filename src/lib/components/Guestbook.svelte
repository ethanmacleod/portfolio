<script lang="ts">
	import RetroDiv from './RetroDiv.svelte';
</script>

<RetroDiv width="w-full">
	<table class="w-full table-auto border-collapse">
		<thead>
			<tr>
				<td colspan="4" class="bg-gradient-to-r from-green-600 to-blue-600 p-2 text-center">
					<span class="retro-text-shadow text-lg font-bold text-white">Sign My Guestbook :3</span>
				</td>
			</tr>
			<tr class="bg-yellow-100">
				<td colspan="4" class="p-3 text-center">
					<div class="bevel-button inline-block bg-gray-200 p-3">
						<form class="flex items-center gap-2">
							<span class="text-sm font-bold">Name:</span>
							<input type="text" class="bevel-inset px-2 py-1 text-sm" placeholder="Your name" />
							<span class="text-sm font-bold">Message:</span>
							<input
								type="text"
								class="bevel-inset flex-1 px-2 py-1 text-sm"
								placeholder="Leave a message!"
							/>
							<button
								type="submit"
								class="bevel-button bg-blue-500 px-3 py-1 text-sm font-bold text-white"
								>Sign!</button
							>
						</form>
					</div>
				</td>
			</tr>
			<tr>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Name</th>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Date</th>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Location</th>
				<th class="bevel-button bg-purple-200 p-2 font-bold text-purple-800">Message</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="4" class="bg-gradient-to-r from-purple-300 to-pink-300 p-2 text-center">
					<span class="text-sm font-bold text-purple-800"
						>Total Entries: 247 | <span class="blink">New!</span></span
					>
				</td>
			</tr>
		</tfoot>
	</table>
</RetroDiv>
