import type { Guestbook } from '@prisma/client';
import { env } from '$env/dynamic/private';

const discordWebhookUrl = env.DISCORD_WEBHOOK_URL;

export async function discordGuestBook(entry: Guestbook) {
	if (!discordWebhookUrl) return;

	await fetch(discordWebhookUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			embeds: [
				{
					title: entry.name,
					fields: [
						{
							name: 'Location',
							value: entry.location ?? 'N/A',
							inline: true
						},
						{
							name: 'Message',
							value: entry.message
						}
					],
					color: 0x00ff00,
					timestamp: new Date(entry.createdAt).toISOString()
				}
			]
		})
	});
}
