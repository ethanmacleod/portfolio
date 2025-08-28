import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import prisma from '$lib/prisma.server.js';
import { guestbookSchema } from './schema.js';
import type { PageServerLoad, Actions } from './$types';
import { discordGuestBook } from '$lib/server/discord.js';

const limiter = new RetryAfterRateLimiter({
	IP: [3, 'h']
});

function sanitizeHtml(input: string): string {
	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;')
		.replace(/\//g, '&#x2F;');
}

export const load: PageServerLoad = async ({ url }) => {
	const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'));
	const limit = 10;
	const offset = (page - 1) * limit;

	try {
		const [entries, totalCount] = await Promise.all([
			prisma.guestbook.findMany({
				orderBy: { createdAt: 'desc' },
				skip: offset,
				take: limit,
				select: {
					id: true,
					name: true,
					message: true,
					location: true,
					createdAt: true
				}
			}),
			prisma.guestbook.count()
		]);

		const totalPages = Math.ceil(totalCount / limit);

		return {
			form: await superValidate(zod(guestbookSchema)),
			entries,
			pagination: {
				page,
				limit,
				totalCount,
				totalPages,
				hasNext: page < totalPages,
				hasPrev: page > 1
			}
		};
	} catch (error) {
		console.error('Error loading guestbook entries:', error);
		return {
			form: await superValidate(zod(guestbookSchema)),
			entries: [],
			pagination: {
				page: 1,
				limit: 10,
				totalCount: 0,
				totalPages: 0,
				hasNext: false,
				hasPrev: false
			}
		};
	}
};

export const actions: Actions = {
	addEntry: async (event) => {
		const status = await limiter.check(event);
		if (status.limited) {
			const form = await superValidate(event.request, zod(guestbookSchema));
			return fail(429, {
				form,
				message:
					'You have reached the maximum number of guestbook entries for this hour. Please try again later.'
			});
		}

		const form = await superValidate(event.request, zod(guestbookSchema));

		if (!form.valid) {
			if (form.errors.message?.some((error) => error.includes('500 characters'))) {
				return fail(400, {
					form,
					message: 'Your message is too long! Please keep it under 500 characters and try again.'
				});
			}
			if (form.errors.name?.some((error) => error.includes('100 characters'))) {
				return fail(400, {
					form,
					message: 'Your name is too long! Please keep it under 100 characters and try again.'
				});
			}
			if (form.errors.location?.some((error) => error.includes('100 characters'))) {
				return fail(400, {
					form,
					message: 'Your location is too long! Please keep it under 100 characters and try again.'
				});
			}
			return fail(400, { form });
		}

		const { name, message, location } = form.data;
		const sanitizedName = sanitizeHtml(name);
		const sanitizedMessage = sanitizeHtml(message);
		const sanitizedLocation = location ? sanitizeHtml(location) : null;

		const ipAddress = event.getClientAddress();
		const userAgent = event.request.headers.get('user-agent') || undefined;

		try {
			const guestEntry = await prisma.guestbook.create({
				data: {
					name: sanitizedName,
					message: sanitizedMessage,
					location: sanitizedLocation,
					ipAddress,
					userAgent
				}
			});
			discordGuestBook(guestEntry);
			return { form };
		} catch (error) {
			console.error('Error creating guestbook entry:', error);
			return fail(500, {
				form,
				message: 'Failed to create entry. Please try again.'
			});
		}
	}
};
