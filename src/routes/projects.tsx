import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { ProjectCard, ProjectPager } from '~/lib/components/ProjectCard';
import { PageStack } from '~/lib/components/ui/Layout';
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

function ProjectsPage() {
	const { project: selectedProjectId } = Route.useSearch();
	const selectedIndex = projects.findIndex((project) => project.id === selectedProjectId);
	const projectIndex = Math.max(0, selectedIndex);
	const project = projects.at(projectIndex);
	assert(project, `No project at index ${projectIndex}`);

	return (
		<PageStack gap="tight" fillsHeight>
			<ProjectCard key={project.id} project={project} />
			{projects.length > 1 && <ProjectPager currentPage={projectIndex + 1} />}
		</PageStack>
	);
}
