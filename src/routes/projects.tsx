import { createFileRoute } from '@tanstack/react-router';
import { range } from 'lodash-es';
import { useState } from 'react';
import { ProjectCard } from '~/lib/components/ProjectCard';
import { projects } from '~/lib/config/projects';
import { pageMeta } from '~/lib/site';
import { assert, cn } from '~/lib/utils';

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
	component: ProjectsPage
});

const pagerButtonClassName =
	'bevel-button bg-gray-200 px-2 py-0.5 text-xs transition-all duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50';

function ProjectsPage() {
	const [projectIndex, setProjectIndex] = useState(0);
	const project = projects.at(projectIndex);
	assert(project, `No project at index ${projectIndex}`);
	const isFirstProject = projectIndex === 0;
	const isLastProject = projectIndex === projects.length - 1;

	return (
		<div className="flex h-full flex-col">
			<ProjectCard key={project.id} project={project} />

			{projects.length > 1 && (
				<div className="bevel-inset mt-2 flex w-full flex-col bg-[#d4d4d4] px-4 py-2 font-[Verdana] text-[13px] leading-tight text-black">
					<div className="px-3 py-1">
						<div className="flex items-center justify-between">
							<button
								type="button"
								onClick={() => setProjectIndex(projectIndex - 1)}
								disabled={isFirstProject}
								aria-label="Previous project"
								className={pagerButtonClassName}
							>
								‹
							</button>

							<div className="flex items-center gap-1">
								{range(projects.length).map((index) => (
									<button
										key={index}
										type="button"
										onClick={() => setProjectIndex(index)}
										aria-current={index === projectIndex}
										className={cn(
											'bevel-button px-2 py-1 text-xs font-bold transition-all duration-200',
											index === projectIndex
												? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
												: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
										)}
									>
										{index + 1}
									</button>
								))}
							</div>

							<button
								type="button"
								onClick={() => setProjectIndex(projectIndex + 1)}
								disabled={isLastProject}
								aria-label="Next project"
								className={pagerButtonClassName}
							>
								›
							</button>
						</div>
						<div className="mt-2 text-center font-mono text-xs leading-none text-gray-500">
							{projectIndex + 1}/{projects.length}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
