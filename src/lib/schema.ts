import { z } from 'zod';
import { containsSwearWords } from '~/lib/swearWords';

export const guestbookSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'REQUIRED_NAME')
		.max(100, 'TOO_LONG_NAME')
		.refine((text) => !containsSwearWords(text), { error: 'SWEAR_WORDS_NAME' }),
	message: z
		.string()
		.trim()
		.min(1, 'REQUIRED_MESSAGE')
		.max(500, 'TOO_LONG_MESSAGE')
		.refine((text) => !containsSwearWords(text), { error: 'SWEAR_WORDS_MESSAGE' }),
	location: z
		.string()
		.trim()
		.max(100, 'TOO_LONG_LOCATION')
		.refine((text) => !text || !containsSwearWords(text), { error: 'SWEAR_WORDS_LOCATION' })
});

export const technologySchema = z.object({
	name: z.string(),
	icon: z.string().optional(),
	brandColor: z.string().optional(),
	hasWhiteBackground: z.boolean().optional()
});

export const projectImageSchema = z.object({
	url: z.string(),
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
	featured: z.boolean().optional()
});

export const contactSchema = z.object({
	name: z.string().trim().min(1, 'REQUIRED_NAME').max(100, 'Name is too long'),
	email: z.string().trim().pipe(z.email('Invalid email address').max(200, 'Email is too long')),
	subject: z.string().trim().max(200, 'Subject is too long'),
	message: z
		.string()
		.trim()
		.min(1, 'REQUIRED_MESSAGE')
		.max(5000, 'Message is too long (max 5000 characters)'),
	website: z.string()
});

export type Technology = z.infer<typeof technologySchema>;
export type ProjectImage = z.infer<typeof projectImageSchema>;
export type Project = z.infer<typeof projectSchema>;
