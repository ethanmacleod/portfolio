import { Link } from '@tanstack/react-router';
import { intervalToDuration } from 'date-fns';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { useNow } from '~/lib/hooks/useNow';
import { cn, mapNullish } from '~/lib/utils';

const birthDate = new Date('2003-01-29T02:16:00+13:00');

const ageParts = [
	{ unit: 'years', className: 'text-green-700' },
	{ unit: 'months', className: 'text-blue-600' },
	{ unit: 'days', className: 'text-purple-600' },
	{ unit: 'hours', className: 'text-orange-700' },
	{ unit: 'minutes', className: 'text-red-600' },
	{ unit: 'seconds', className: 'text-cyan-700' }
] as const;

function AgeCounter() {
	const now = useNow(1000);
	const age = mapNullish(now, (date) => intervalToDuration({ start: birthDate, end: date }));

	return (
		<>
			{ageParts.map((part, index) => (
				<span key={part.unit}>
					<span className={cn('font-bold', part.className)}>
						{mapNullish(age, (duration) => duration[part.unit] ?? 0) ?? '--'}
					</span>{' '}
					{part.unit}
					{index === ageParts.length - 1 ? ' old!' : ', '}
				</span>
			))}
		</>
	);
}

export function ProfileCard() {
	return (
		<RetroDiv>
			<table className="w-full table-auto border-collapse">
				<thead>
					<tr>
						<td
							colSpan={3}
							className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 text-center"
						>
							<span className="retro-text-shadow text-lg font-bold text-white">About Me</span>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-gray-100">
						<td className="hidden w-32 p-3 align-top md:table-cell">
							<img
								src="/me.avif"
								alt="Ethan MacLeod"
								className="h-full w-full border-r-2 border-b-2 border-gray-600 bg-gray-300 object-fill"
							/>
						</td>
						<td className="p-3 align-top">
							<table className="w-full">
								<tbody>
									<tr>
										<td className="w-20 py-1 font-bold text-blue-700">Name:</td>
										<td>Ethan David Francis MacLeod</td>
									</tr>
									<tr className="bg-gray-50">
										<td className="py-1 font-bold text-blue-700">Age:</td>
										<td className="font-mono text-sm">
											<AgeCounter />
										</td>
									</tr>
									<tr>
										<td className="py-1 font-bold text-blue-700">Location:</td>
										<td>Hamilton, Waikato, New Zealand</td>
									</tr>
									<tr className="bg-gray-50">
										<td className="py-1 font-bold text-blue-700">Email:</td>
										<td className="text-blue-600 underline">ethandavidfrancis@gmail.com</td>
									</tr>
									<tr>
										<td className="py-1 font-bold text-blue-700">Interests:</td>
										<td>
											Programming, Football, Reading [Currently:{' '}
											<span className="rainbow-text">Jack Reacher, At the Mountain of Madness</span>
											], Games [Currently:{' '}
											<span className="rainbow-text">Cyberpunk 2077, Slay the Spire, TBOI</span>],
											and long walks on the beach
										</td>
									</tr>
								</tbody>
							</table>
						</td>
						<td className="hidden w-32 p-3 align-top md:table-cell">
							<img
								src="/me2-thumb.avif"
								alt="Ethan MacLeod"
								className="h-full w-full border-r-2 border-b-2 border-gray-600 object-fill"
							/>
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="bg-white p-3">
							<div className="bevel-inset bg-gray-50 p-3">
								<p className="mb-2">
									<strong className="text-purple-700">Welcome to my website!</strong>
								</p>
								<p className="mb-2">
									Take a look around, I aim to update this website as often as possible, adding
									little easter eggs and just stuff I find cool to make. If you are struggling to
									find what to check out first, I recommend having a play around with the{' '}
									<Link
										to="/boids"
										className="shine-text text-sm font-bold transition-colors duration-200 hover:text-green-400"
									>
										BOID SIMULATOR
									</Link>{' '}
									or if you are a true <span>Ethan MacLeod</span> fan, catch up on your knowledge of
									what I'm making at the moment in the{' '}
									<Link
										to="/projects"
										className="rainbow-text text-sm font-bold transition-colors duration-200 hover:text-green-400"
									>
										Projects
									</Link>{' '}
									page.
								</p>
								<p className="mb-4">
									As a kid growing up in the early 2000s, websites like this one were something I
									visited all the time - especially when looking at game dev's personal websites or
									some of my more technically literate friends. With the constant cookie-cutter /
									default-template portfolios I see nowadays, I find myself more drawn towards
									websites like these which hardly exist outside of some stragglers and archives. I
									really hate to get on a soap box here but after making 30+ web applications for
									clients, they all look vaguely similar. At some point making bold creative
									decisions will affect UX, so they get thrown out the door.
								</p>
								<div className="bevel-button my-4 border-4 bg-gradient-to-br from-yellow-200 to-orange-300 p-4">
									<p className="mb-2 text-center font-bold text-purple-800">
										Does this show my competency at web development? Absolutely not.
									</p>
									<p className="mb-2 text-center font-bold text-purple-800">
										Would I make a website like this one for a client if not specifically asked?
										Don't be silly.
									</p>
									<p className="text-center font-bold text-purple-800">
										But this is my website so here we are.
									</p>
								</div>
								<p className="text-center">
									<span className="blink font-bold text-red-600">★ Thanks for visiting! ★</span>
								</p>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</RetroDiv>
	);
}
