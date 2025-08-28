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
