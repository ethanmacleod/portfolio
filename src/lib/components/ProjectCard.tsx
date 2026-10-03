import { useState } from 'react';
import { GitHubIcon } from '~/lib/components/icons';
import { RetroDiv } from '~/lib/components/RetroDiv';
import { SkillBlock } from '~/lib/components/SkillBlock';
import type { Project, ProjectImage } from '~/lib/schema';
import { assert, cn } from '~/lib/utils';

export function ProjectCard({ project }: { project: Project }) {
	return (
		<div className="flex min-h-0 flex-1 flex-col overflow-hidden">
			<RetroDiv className="mb-3 shrink-0">
				<div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 p-2">
					<div className="flex items-center gap-3">
						<h1 className="retro-text-shadow text-lg font-bold text-white">{project.title}</h1>
						{project.featured && (
							<span className="rounded bg-yellow-400 px-2 py-0.5 font-mono text-xs text-yellow-900">
								⭐ FEATURED
							</span>
						)}
					</div>
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="bevel-button flex items-center gap-2 bg-gray-700 px-3 py-1.5 transition-colors duration-200 hover:bg-gray-600"
						title="View on GitHub"
					>
						<GitHubIcon className="h-4 w-4 fill-white" />
						<span className="font-mono text-xs text-white">See the codebase here</span>
					</a>
				</div>
			</RetroDiv>

			<div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
				<div className="flex-1 overflow-hidden">
					{project.images.length > 0 && (
						<RetroDiv className="h-full shrink-0">
							<ProjectImageGallery images={project.images} />
						</RetroDiv>
					)}
				</div>

				<div className="flex h-full flex-col gap-3 lg:w-96">
					<RetroDiv className="flex-1 overflow-auto p-2">
						<h2 className="mb-2 text-center text-sm font-bold text-blue-700">Tech Stack</h2>
						<div className="grid grid-cols-2 place-items-center gap-1">
							{project.technologies.map((technology, index) => (
								<SkillBlock key={technology.name} {...technology} waveIndex={index} />
							))}
						</div>
					</RetroDiv>

					<RetroDiv className="flex-1 overflow-auto p-2">
						<h2 className="mb-2 text-sm font-bold text-blue-700">Description</h2>
						<p className="mb-2 text-sm text-gray-700">{project.description}</p>
						{project.longDescription && (
							<p className="mb-2 text-xs text-gray-600">{project.longDescription}</p>
						)}
					</RetroDiv>
				</div>
			</div>
		</div>
	);
}

const galleryArrowClassName =
	'bevel-button absolute top-1/2 -translate-y-1/2 bg-white p-2 font-bold text-gray-700 transition-all duration-200';

function ProjectImageGallery({ images }: { images: ProjectImage[] }) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedImage = images.at(selectedIndex);
	assert(selectedImage, 'ProjectImageGallery needs at least one image');

	function showPreviousImage() {
		setSelectedIndex((index) => (index - 1 + images.length) % images.length);
	}

	function showNextImage() {
		setSelectedIndex((index) => (index + 1) % images.length);
	}

	return (
		<div className="flex h-full flex-col p-3">
			<div className="relative mb-2 min-h-0 flex-1 overflow-hidden bg-gray-200">
				<img
					src={selectedImage.url}
					alt={selectedImage.alt}
					className="h-full w-full object-contain"
				/>
				{images.length > 1 && (
					<>
						<button
							type="button"
							onClick={showPreviousImage}
							aria-label="Previous image"
							className={cn(galleryArrowClassName, 'left-2')}
						>
							‹
						</button>
						<button
							type="button"
							onClick={showNextImage}
							aria-label="Next image"
							className={cn(galleryArrowClassName, 'right-2')}
						>
							›
						</button>
					</>
				)}
			</div>

			{images.length > 1 && (
				<div className="flex shrink-0 justify-center gap-1 pb-1">
					{images.map((image, index) => (
						<button
							key={image.url}
							type="button"
							aria-label={`Show image ${index + 1}`}
							aria-current={index === selectedIndex}
							onClick={() => setSelectedIndex(index)}
							className={cn(
								'h-3 w-3 rounded-full border-2 transition-colors duration-200',
								index === selectedIndex ? 'border-blue-500 bg-blue-500' : 'border-white bg-white'
							)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
