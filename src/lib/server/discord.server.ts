import type { Guestbook } from '@prisma/client';

export async function notifyDiscordOfGuestbookEntry(entry: Guestbook) {
	const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
	if (!webhookUrl) return;

	const response = await fetch(webhookUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			embeds: [
				{
					title: entry.name,
					fields: [
						{ name: 'Location', value: entry.location ?? 'N/A', inline: true },
						{ name: 'Message', value: entry.message }
					],
					color: 0x00ff00,
					timestamp: entry.createdAt.toISOString()
				}
			]
		})
	});

	if (!response.ok) {
		console.error(`discord: webhook returned ${response.status}`, await response.text());
	}
}
