import { z } from 'zod';
import { containsSwearWords } from '$lib/swearWords.js';

export const guestbookSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Name is required')
		.max(100, 'TOO_LONG_NAME')
		.refine((text) => !containsSwearWords(text), { message: 'SWEAR_WORDS_NAME' }),
	message: z
		.string()
		.trim()
		.min(1, 'Message is required')
		.max(500, 'TOO_LONG_MESSAGE')
		.refine((text) => !containsSwearWords(text), { message: 'SWEAR_WORDS_MESSAGE' }),
	location: z
		.string()
		.trim()
		.max(100, 'TOO_LONG_LOCATION')
		.refine((text) => !text || !containsSwearWords(text), { message: 'SWEAR_WORDS_LOCATION' })
		.optional()
});

export const guestbookEntrySchema = z.object({
	id: z.number(),
	name: z.string(),
	message: z.string(),
	location: z.string().optional(),
	createdAt: z.date()
});

export const analyticsSchema = z.object({
	totalViews: z.number(),
	badActors: z.number()
});

export const technologySchema = z.object({
	name: z.string(),
	icon: z.string().optional(),
	brandColor: z.string().optional()
});

export const projectImageSchema = z.object({
	url: z.string(),
	caption: z.string().optional(),
	alt: z.string()
});

export const projectSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	longDescription: z.string().optional(),
	githubUrl: z.string(),
	technologies: z.array(technologySchema),
	images: z.array(projectImageSchema),
	status: z.enum(['active', 'completed', 'archived']),
	featured: z.boolean().optional(),
	demoUrl: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional()
});

export const paginationInfoSchema = z.object({
	page: z.number(),
	limit: z.number(),
	totalCount: z.number(),
	totalPages: z.number(),
	hasNext: z.boolean(),
	hasPrev: z.boolean()
});

export type GuestbookEntry = z.infer<typeof guestbookEntrySchema>;
export type Analytics = z.infer<typeof analyticsSchema>;
export type Technology = z.infer<typeof technologySchema>;
export type ProjectImage = z.infer<typeof projectImageSchema>;
export type Project = z.infer<typeof projectSchema>;
export type PaginationInfo = z.infer<typeof paginationInfoSchema>;
