import { Link } from '@tanstack/react-router';
import { socials } from '~/lib/config/contact';

const navButtonClassName =
	'bevel-button block h-[40px] bg-win-button transition-all duration-200 hover:shadow-lg hover:brightness-110';

const gifNavLinks = [
	{ to: '/projects', gifName: 'projects', label: 'Projects' },
	{ to: '/contact', gifName: 'contact-me', label: 'Contact Me' },
	{ to: '/resume', gifName: 'resume', label: 'Resume' },
	{ to: '/uses', gifName: 'uses', label: 'Uses' },
	{ to: '/homelab', gifName: 'homelab', label: 'Homelab' },
	{ to: '/boids', gifName: 'boids', label: 'Boids' }
] as const;

export function LeftNav() {
	return (
		<nav className="flex h-full flex-col">
			<ul className="flex flex-col gap-2">
				<li className={navButtonClassName}>
					<Link to="/" aria-label="Home" className="block h-full w-full">
						<img
							src="https://images.cooltext.com/5732587.gif"
							className="block h-full w-full object-contain"
							alt="Home Page"
						/>
					</Link>
				</li>
				{gifNavLinks.map((navLink) => (
					<li key={navLink.to} className={navButtonClassName}>
						<Link to={navLink.to} aria-label={navLink.label} className="block h-full w-full">
							<video
								autoPlay
								loop
								muted
								playsInline
								aria-hidden="true"
								src={`/gifs/${navLink.gifName}.webm`}
								className="block h-full w-full object-fill"
							/>
						</Link>
					</li>
				))}
			</ul>

			<div className="my-4 px-1">
				<div className="border-t border-win-shadow" />
				<div className="border-t border-white" />
			</div>

			<div className="flex-1" />

			<ul className="flex flex-col gap-1">
				{socials.map((social) => (
					<li
						key={social.label}
						className="bevel-button bg-win-button transition-all duration-150 hover:bg-win-button-hover"
					>
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-8 w-full items-center gap-2 px-2 font-mono text-xs font-bold text-black"
						>
							<social.Icon className="h-4 w-4" />
							{social.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
