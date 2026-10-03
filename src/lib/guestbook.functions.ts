import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader, getRequestIP } from '@tanstack/react-start/server';
import { z } from 'zod';
import { guestbookSchema } from '~/lib/schema';
import { notifyDiscordOfGuestbookEntry } from '~/lib/server/discord.server';
import { prisma } from '~/lib/server/prisma.server';
import { consumeIpRateLimit } from '~/lib/server/rateLimit.server';

const guestbookPageSize = 10;

export const getGuestbookPage = createServerFn()
	.inputValidator(z.object({ page: z.number().int().min(1) }))
	.handler(async ({ data: { page } }) => {
		const [entries, totalCount] = await prisma.$transaction([
			prisma.guestbook.findMany({
				orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
				skip: (page - 1) * guestbookPageSize,
				take: guestbookPageSize,
				select: { id: true, name: true, message: true, location: true, createdAt: true }
			}),
			prisma.guestbook.count()
		]);

		return {
			entries,
			page,
			totalCount,
			totalPages: Math.ceil(totalCount / guestbookPageSize)
		};
	});

export type GuestbookPage = Awaited<ReturnType<typeof getGuestbookPage>>;
export type GuestbookEntry = GuestbookPage['entries'][number];

export const addGuestbookEntry = createServerFn({ method: 'POST' })
	.inputValidator(guestbookSchema)
	.handler(async ({ data }) => {
		const rateLimit = await consumeIpRateLimit({
			scope: 'guestbook',
			maxRequests: 3,
			windowSeconds: 60 * 60
		});
		if (rateLimit.isLimited) return { result: 'rateLimited' } as const;

		const entry = await prisma.guestbook.create({
			data: {
				...data,
				location: data.location || null,
				ipAddress: getRequestIP({ xForwardedFor: true }),
				userAgent: getRequestHeader('user-agent')
			}
		});
		console.log(`guestbook: entry ${entry.id} added by ${entry.name}`);

		try {
			await notifyDiscordOfGuestbookEntry(entry);
		} catch (error) {
			console.error('guestbook: Discord notification failed', error);
		}

		return { result: 'created' } as const;
	});
