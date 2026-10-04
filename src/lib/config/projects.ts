import type { Project } from '~/lib/schema';

export const projects: Project[] = [
	{
		id: 'aws-terraform',
		title: 'AWS Infrastructure Automation',
		description:
			"A Terraform project for managing the infrastructure of the 'BetterReads' application with automated AWS cloud resource provisioning.",
		longDescription:
			'Infrastructure as Code (IaC) solution that automates the deployment and management of AWS cloud resources. This architecture was built for the deployment of a sister project - "BetterReads" - a book themed social media for the tracking and sharing of book stats. The infrastructure includes management of public and private subnets, security, CI/CD, and accounts for high availability for the application',
		githubUrl: 'https://github.com/ethanmacleod/AWS-Terraform',
		technologies: [
			{ name: 'TERRAFORM', icon: 'terraform.avif', brandColor: '#623CE4' },
			{ name: 'AWS', icon: 'aws.avif', brandColor: '#FF9900' }
		],
		images: [
			{
				url: '/project-screenshots/1/aws-terraform-architecture.avif',
				alt: 'AWS infrastructure diagram'
			}
		],
		featured: false
	},
	{
		id: 'micro-grid-simulator',
		title: 'Micro-Grid Energy Simulator',
		description:
			'An interactive web-based platform for modeling, analyzing, and optimizing micro-grid systems with real-time energy flow visualization.',
		longDescription:
			'A simulation platform focusing on energy micro-grids that enables users to simulate energy flows, resource allocation, and cost analysis for micro-grid systems. \
            Features interactive real-time visualization, customizable simulation scenarios, persistent data management, and high-performance backend with caching. \
            Provides insights into energy efficiency, sustainability, and economic feasibility of micro-grid infrastructure.',
		githubUrl: 'https://github.com/ethanmacleod/micro-grid-simulator',
		technologies: [
			{ name: 'REACT', icon: 'react.avif', brandColor: '#00D8FF' },
			{ name: 'DJANGO', icon: 'django.avif', brandColor: '#10B981', hasWhiteBackground: true },
			{ name: 'TS', icon: 'typescript.avif', brandColor: '#007ACC' },
			{ name: 'PSQL', icon: 'postgres.avif', brandColor: '#4A90E2' },
			{ name: 'DOCKER', icon: 'docker.avif', brandColor: '#2496ED' }
		],
		images: [
			{
				url: '/project-screenshots/2/2.avif',
				alt: 'Micro-grid simulation dashboard single item'
			},
			{
				url: '/project-screenshots/2/3.avif',
				alt: 'Micro-grid simulation dashboard collapsed'
			},
			{
				url: '/project-screenshots/2/4.avif',
				alt: 'Micro-grid simulation dashboard projects'
			}
		],
		featured: false
	},
	{
		id: 'flashd-mobile-app',
		title: 'Flashd Mobile Application',
		description:
			'A cross-platform mobile application built with Expo and React Native, supporting Android, iOS, and web deployment.',
		longDescription:
			'Universal mobile application developed using the Expo ecosystem with file-based routing and cross-platform compatibility. Features include development builds, mobile emulator support, and configurable development environment. Built with modern React Native practices and TypeScript for type safety and maintainable code.',
		githubUrl: 'https://github.com/ethanmacleod/flashd',
		technologies: [
			{ name: 'EXPO', brandColor: '#000020' },
			{ name: 'REACT', icon: 'react.avif', brandColor: '#00D8FF' },
			{ name: 'TS', icon: 'typescript.avif', brandColor: '#007ACC' },
			{ name: 'MOBILE', brandColor: '#6B7280' }
		],
		images: [],
		featured: false
	}
];
