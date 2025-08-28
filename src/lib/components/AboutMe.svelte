<script lang="ts">
	import { onMount } from 'svelte';
	import { getAge } from '$lib/functions';
	import RetroDiv from './RetroDiv.svelte';

	let age = getAge();

	onMount(() => {
		const interval = setInterval(() => {
			age = getAge();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<RetroDiv width="w-full" className="mb-6">
	<table class="w-full table-auto border-collapse">
		<thead>
			<tr>
				<td colspan="2" class="bg-gradient-to-r from-blue-600 to-purple-600 p-2 text-center">
					<span class="retro-text-shadow text-lg font-bold text-white">About Me</span>
				</td>
			</tr>
		</thead>
		<tbody>
			<tr class="bg-gray-100">
				<td class="bevel-inset w-32 p-3 align-top">
					<img
						src="/me.jpg"
						alt="Ethan MacLeod"
						class="bevel-button h-full w-full bg-gray-300 object-fill"
					/>
				</td>
				<td class="p-3 align-top">
					<table class="w-full">
						<tbody>
							<tr>
								<td class="w-20 py-1 font-bold text-blue-700">Name:</td>
								<td>Ethan David Francis MacLeod</td>
							</tr>
							<tr class="bg-gray-50">
								<td class="py-1 font-bold text-blue-700">Age:</td>
								<td class="font-mono text-sm">
									<span class="font-bold text-green-600">{age.years}</span> years,
									<span class="font-bold text-blue-600">{age.months}</span> months,
									<span class="font-bold text-purple-600">{age.days}</span> days,
									<span class="font-bold text-orange-600">{age.hours}</span> hours,
									<span class="font-bold text-red-600">{age.minutes}</span> minutes,
									<span class="font-bold text-cyan-600">{age.seconds}</span> seconds old!
								</td>
							</tr>
							<tr>
								<td class="py-1 font-bold text-blue-700">Location:</td>
								<td>Hamilton, Waikato, New Zealand</td>
							</tr>
							<tr class="bg-gray-50">
								<td class="py-1 font-bold text-blue-700">Email:</td>
								<td class="text-blue-600 underline">ethandavidfrancis@gmail.com</td>
							</tr>
							<tr>
								<td class="py-1 font-bold text-blue-700">Interests:</td>
								<td
									>Programming, Football, Reading (currently Jack Reacher), Games, and long walks on
									the beach</td
								>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="2" class="bg-white p-3">
					<div class="bevel-inset bg-gray-50 p-3">
						<p class="mb-2"><strong class="text-purple-700">Welcome to my homepage!</strong></p>
						<p class="mb-2">
							Take a look around, I aim to update this website as often as possible, adding little
							easter eggs and just stuff I find cool to make. If you are struggling to find what to
							check out first, I recommend having a play around with the
							<a
								href="/boids"
								class="shine-text text-sm font-bold transition-colors duration-200 hover:text-green-400"
								>BOID SIMULATOR</a
							>
							or if you are a true <span>Ethan MacLeod</span> fan, catch up on your knowledge of
							what I'm making at the moment in the
							<a
								href="/projects"
								class="rainbow-text text-sm font-bold transition-colors duration-200 hover:text-green-400"
								>Projects</a
							> page.
						</p>
						<p class="mb-4">
							As a kid growing up in the early 200s, websites like this one were something I visited
							all the time - especially when looking at game dev's personal websites or some of my
							more technically literate friends. With the constant cookie-cutter / default-template
							portfolios I see nowadays, I find myself more drawn towards websites like these which
							hardly exist outside of some stragglers and archives. I really hate to get on a soap
							box here but after making 30+ web applications for clients, they all look vaguely
							similar. At some point making bold creative decisions will affect UX, so they get
							thrown out the door.
						</p>
						<div
							class="bevel-button my-4 border-4 bg-gradient-to-br from-yellow-200 to-orange-300 p-4"
						>
							<p class="mb-2 text-center font-bold text-purple-800">
								Does this show my competency at web development? Absolutely not.
							</p>
							<p class="mb-2 text-center font-bold text-purple-800">
								Would I make a website like this one for a client if not specifically asked? Don't
								be silly.
							</p>
							<p class="text-center font-bold text-purple-800">
								But this is my website so I will do what I damn well please.
							</p>
						</div>
						<p class="text-center">
							<span class="blink font-bold text-red-600">★ Thanks for visiting! ★</span>
						</p>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</RetroDiv>
