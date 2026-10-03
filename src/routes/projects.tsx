import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { ProjectCard } from '~/lib/components/ProjectCard';
import { bevelButtonClassName } from '~/lib/components/ui/BevelButton';
import { Window } from '~/lib/components/ui/Window';
import { projects } from '~/lib/config/projects';
import { pageMeta } from '~/lib/site';
import { assert } from '~/lib/utils';

const projectsSearchSchema = z.object({
	project: z.string().optional().catch(undefined)
});

export const Route = createFileRoute('/projects')({
	staticData: {
		heading: {
			title: 'Check Out My Projects!',
			subtitle: "I've made some pretty cool stuff... besides this website"
		},
		sitemap: { priority: 0.9, changefreq: 'weekly' }
	},
	head: () => ({
		meta: pageMeta('Projects - Ethan MacLeod', 'Explore my latest projects and development work')
	}),
	validateSearch: projectsSearchSchema,
	component: ProjectsPage
});

const stepButtonClassName = bevelButtonClassName({
	variant: 'light',
	className: 'py-0.5 font-normal text-black'
});

function ProjectsPage() {
	const { project: selectedProjectId } = Route.useSearch();
	const selectedIndex = projects.findIndex((project) => project.id === selectedProjectId);
	const projectIndex = Math.max(0, selectedIndex);
	const project = projects.at(projectIndex);
	assert(project, `No project at index ${projectIndex}`);
	const previousProject = projects.at(projectIndex - 1);
	const nextProject = projects.at(projectIndex + 1);
	const isFirstProject = projectIndex === 0;

	return (
		<div className="flex h-full flex-col">
			<ProjectCard key={project.id} project={project} />

			{projects.length > 1 && (
				<Window className="mt-2 px-4 py-2">
					<div className="px-3 py-1">
						<div className="flex items-center justify-between">
							<Link
								to="/projects"
								search={{ project: previousProject?.id }}
								disabled={isFirstProject}
								aria-label="Previous project"
								className={stepButtonClassName}
							>
								‹
							</Link>

							<div className="flex items-center gap-1">
								{projects.map((pagerProject, index) => (
									<Link
										key={pagerProject.id}
										to="/projects"
										search={{ project: pagerProject.id }}
										aria-label={pagerProject.title}
										className={bevelButtonClassName({
											variant: index === projectIndex ? 'selected' : 'light'
										})}
									>
										{index + 1}
									</Link>
								))}
							</div>

							<Link
								to="/projects"
								search={{ project: nextProject?.id }}
								disabled={!nextProject}
								aria-label="Next project"
								className={stepButtonClassName}
							>
								›
							</Link>
						</div>
						<div className="mt-2 text-center font-mono text-xs leading-none text-gray-500">
							{projectIndex + 1}/{projects.length}
						</div>
					</div>
				</Window>
			)}
		</div>
	);
}
