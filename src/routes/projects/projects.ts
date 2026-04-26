export const projects = [
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
				alt: 'AWS infrastructure diagram',
				caption: 'Automated AWS infrastructure deployment architecture'
			}
		],
		status: 'completed' as const,
		featured: false,
		startDate: '2023-03',
		endDate: '2023-05'
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
			{ name: 'DJANGO', icon: 'django.avif', brandColor: '#10B981' },
			{ name: 'TS', icon: 'typescript.avif', brandColor: '#007ACC' },
			{ name: 'PSQL', icon: 'postgres.avif', brandColor: '#4A90E2' },
			{ name: 'DOCKER', icon: 'docker.avif', brandColor: '#2496ED' }
		],
		images: [
			{
				url: '/project-screenshots/2/1.avif',
				alt: 'Micro-grid simulation dashboard',
				caption: 'Micro grid simulator accordion dash'
			},
			{
				url: '/project-screenshots/2/2.avif',
				alt: 'Micro-grid simulation dashboard single item',
				caption: 'Micro grid simulator single item'
			},
			{
				url: '/project-screenshots/2/3.avif',
				alt: 'Micro-grid simulation dashboard collapsed',
				caption: 'Micro grid simulator collapsed view'
			},
			{
				url: '/project-screenshots/2/4.avif',
				alt: 'Micro-grid simulation dashboard projects',
				caption: 'Micro grid simulator projects view'
			}
		],
		status: 'active' as const,
		featured: false,
		startDate: '2024-02',
		endDate: undefined
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
			{ name: 'EXPO', icon: 'expo.png', brandColor: '#000020' },
			{ name: 'REACT', icon: 'react.avif', brandColor: '#00D8FF' },
			{ name: 'TS', icon: 'typescript.avif', brandColor: '#007ACC' },
			{ name: 'MOBILE', icon: 'mobile.png', brandColor: '#6B7280' }
		],
		images: [
			{
				url: '/project-screenshots/3/1.png',
				alt: 'Home page view',
				caption: 'Home page view'
			}
		],
		status: 'active' as const,
		featured: false,
		startDate: '2024-06',
		endDate: undefined
	},
	{
		id: 'pi-services-homelab',
		title: 'Raspberry Pi Home Server Infrastructure',
		description:
			'A containerized home server infrastructure spanning two Raspberry Pi devices for monitoring, media management, and utility services.',
		longDescription:
			'Comprehensive home server solution built with Docker Compose across two Raspberry Pi devices. Features system monitoring with Prometheus and Grafana, media streaming with Plex, file management, and remote device control. Includes modular service stacks, Wake-on-LAN API, torrent management, and customizable dashboards for complete home infrastructure management.',
		githubUrl: 'https://github.com/ethanmacleod/pi-services',
		technologies: [
			{ name: 'DOCKER', icon: 'docker.avif', brandColor: '#2496ED' },
			{ name: 'PYTHON', icon: 'python.avif', brandColor: '#3B82F6' },
			{ name: 'GRAFANA', icon: 'grafana.png', brandColor: '#F46800' },
			{ name: 'PSQL', icon: 'postgres.avif', brandColor: '#4A90E2' },
			{ name: 'RASPBERRY', icon: 'raspberry.png', brandColor: '#C51A4A' }
		],
		images: [
			{
				url: '/project-screenshots/4/1.avif',
				alt: 'Home page view',
				caption: 'Home page view'
			},
			{
				url: '/project-screenshots/4/2.avif',
				alt: 'Portainer dash',
				caption: 'Portainer dash'
			},
			{
				url: '/project-screenshots/4/3.avif',
				alt: 'rafana dash',
				caption: 'Grafana dash'
			}
		],
		status: 'active' as const,
		featured: true,
		startDate: '2024-03',
		endDate: undefined
	}
];
