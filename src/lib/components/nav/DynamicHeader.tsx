import { useLocation } from '@tanstack/react-router';

type PageHeading = {
	title: string;
	subtitle: string;
};

const pageHeadings: Record<string, PageHeading> = {
	'/': {
		title: 'Welcome to My Website!',
		subtitle: 'Get to know a little bit about me and sign my guestbook :)'
	},
	'/projects': {
		title: 'Check Out My Projects!',
		subtitle: "I've made some pretty cool stuff... besides this website"
	},
	'/contact': {
		title: 'Contact Me!',
		subtitle: "Get in touch - I'd love to hear from you"
	},
	'/resume': {
		title: 'My Resume',
		subtitle: 'Always keen for some feedback, chuck it in the guestbook!'
	},
	'/uses': {
		title: 'My Stack & Setup',
		subtitle: 'Just some misc stats about me :)'
	},
	'/homelab': {
		title: 'My Homelab',
		subtitle: 'About $20/month of maintenance that sits in my livingroom'
	},
	'/boids': {
		title: 'Boids Simulation',
		subtitle: "Always thought boids were cool. 3D would be the next plan... let's take a look at D3"
	}
};

const fallbackHeading: PageHeading = {
	title: 'Welcome to My Site!',
	subtitle: 'Thanks for visiting!'
};

export function DynamicHeader() {
	const pathname = useLocation({ select: (location) => location.pathname });
	const heading = pageHeadings[pathname] ?? fallbackHeading;

	return (
		<div className="box-border flex h-full w-full flex-col justify-between bg-gradient-to-br from-green-600 to-teal-700 px-4 py-2 font-[Verdana] leading-tight text-white">
			<span className="rainbow-text text-center text-base leading-tight font-bold">
				{heading.title}
			</span>
			<span className="text-center text-xs leading-tight">{heading.subtitle}</span>
		</div>
	);
}
