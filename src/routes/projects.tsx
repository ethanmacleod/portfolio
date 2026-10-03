import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { ProjectCard } from '~/lib/components/ProjectCard';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { projects } from '~/lib/config/projects';
import { pageMeta } from '~/lib/site';
import { assert, cn } from '~/lib/utils';

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

const pagerButtonClassName =
	'bevel-button bg-gray-200 px-2 py-0.5 text-xs transition-all duration-200 hover:bg-gray-300';

const disabledPagerClassName = 'cursor-not-allowed opacity-50';

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
				<RetroDiv className="mt-2 px-4 py-2">
					<div className="px-3 py-1">
						<div className="flex items-center justify-between">
							<Link
								to="/projects"
								search={{ project: previousProject?.id }}
								disabled={isFirstProject}
								aria-label="Previous project"
								className={cn(pagerButtonClassName, isFirstProject && disabledPagerClassName)}
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
										className={cn(
											'bevel-button px-2 py-1 text-xs font-bold transition-all duration-200',
											index === projectIndex
												? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
												: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
										)}
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
								className={cn(pagerButtonClassName, !nextProject && disabledPagerClassName)}
							>
								›
							</Link>
						</div>
						<div className="mt-2 text-center font-mono text-xs leading-none text-gray-500">
							{projectIndex + 1}/{projects.length}
						</div>
					</div>
				</RetroDiv>
			)}
		</div>
	);
}
