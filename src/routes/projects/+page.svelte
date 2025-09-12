<script lang="ts">
	import Projects from '$lib/components/Projects.svelte';

	const projects = [
		{
			id: 'aws-terraform',
			title: 'AWS Infrastructure Automation',
			description:
				"A Terraform project for managing the infrastructure of the 'BetterReads' application with automated AWS cloud resource provisioning.",
			longDescription:
				'Infrastructure as Code (IaC) solution that automates the deployment and management of AWS cloud resources. Features configurable infrastructure variables, supports infrastructure initialization, planning, application, and destruction. Provides a structured, repeatable approach to cloud infrastructure management with support for custom AWS regions and configurable instance types.',
			githubUrl: 'https://github.com/ethanmacleod/AWS-Terraform',
			technologies: [
				{ name: 'TERRAFORM', icon: 'terraform.png', brandColor: '#623CE4' },
				{ name: 'AWS', icon: 'aws.png', brandColor: '#FF9900' },
				{ name: 'DEVOPS', icon: 'devops.png', brandColor: '#326CE5' }
			],
			images: [
				{
					url: '/project-screenshots/aws-terraform-architecture.png',
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
				'Comprehensive simulation platform that enables users to simulate energy flows, resource allocation, and cost analysis for micro-grid systems. Features interactive real-time visualization, customizable simulation scenarios, persistent data management, and high-performance backend with caching. Provides insights into energy efficiency, sustainability, and economic feasibility of micro-grid infrastructure.',
			githubUrl: 'https://github.com/ethanmacleod/micro-grid-simulator',
			technologies: [
				{ name: 'REACT', icon: 'react.png', brandColor: '#00D8FF' },
				{ name: 'DJANGO', icon: 'django.png', brandColor: '#10B981' },
				{ name: 'TS', icon: 'typescript.png', brandColor: '#007ACC' },
				{ name: 'PSQL', icon: 'postgres.png', brandColor: '#4A90E2' },
				{ name: 'DOCKER', icon: 'docker.png', brandColor: '#2496ED' }
			],
			images: [
				{
					url: '/project-screenshots/microgrid-dashboard.png',
					alt: 'Micro-grid simulation dashboard',
					caption: 'Interactive energy flow visualization and control panel'
				},
				{
					url: '/project-screenshots/microgrid-analysis.png',
					alt: 'Energy analysis charts',
					caption: 'Real-time energy efficiency and cost analysis'
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
				{ name: 'REACT', icon: 'react.png', brandColor: '#00D8FF' },
				{ name: 'TS', icon: 'typescript.png', brandColor: '#007ACC' },
				{ name: 'MOBILE', icon: 'mobile.png', brandColor: '#6B7280' }
			],
			images: [
				{
					url: '/project-screenshots/flashd-mobile-home.png',
					alt: 'Flashd mobile app home screen',
					caption: 'Clean mobile interface with cross-platform design'
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
				{ name: 'DOCKER', icon: 'docker.png', brandColor: '#2496ED' },
				{ name: 'PYTHON', icon: 'python.png', brandColor: '#3B82F6' },
				{ name: 'GRAFANA', icon: 'grafana.png', brandColor: '#F46800' },
				{ name: 'PSQL', icon: 'postgres.png', brandColor: '#4A90E2' },
				{ name: 'RASPBERRY', icon: 'raspberry.png', brandColor: '#C51A4A' }
			],
			images: [
				{
					url: '/project-screenshots/pi-services-dashboard.png',
					alt: 'Home server monitoring dashboard',
					caption: 'Grafana dashboard showing system metrics and service status'
				},
				{
					url: '/project-screenshots/pi-services-media.png',
					alt: 'Media server interface',
					caption: 'Plex media server with file browser integration'
				}
			],
			status: 'active' as const,
			featured: true,
			startDate: '2024-03',
			endDate: undefined
		}
	];
</script>

<svelte:head>
	<title>Projects - Ethan MacLeod</title>
	<meta name="description" content="Explore my latest projects and development work" />
</svelte:head>

<Projects {projects} itemsPerPage={1} showPagination={true} className="h-full" />
