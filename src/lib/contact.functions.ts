import { createServerFn } from '@tanstack/react-start';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { contactSchema } from '~/lib/schema';
import { consumeIpRateLimit } from '~/lib/server/rateLimit.server';

const smtpEnvSchema = z.object({
	SMTP_HOST: z.string().min(1),
	SMTP_PORT: z.coerce.number().int().default(587),
	SMTP_USER: z.string().min(1),
	SMTP_PASS: z.string().min(1),
	SMTP_FROM: z.string().min(1),
	CONTACT_TO_EMAIL: z.string().min(1)
});

export const sendContactMessage = createServerFn({ method: 'POST' })
	.inputValidator(contactSchema)
	.handler(async ({ data: { name, email, subject, message } }) => {
		const smtpEnv = smtpEnvSchema.safeParse(process.env);
		if (!smtpEnv.success) {
			console.error('contact: SMTP is not configured', smtpEnv.error.flatten().fieldErrors);
			return { result: 'notConfigured' } as const;
		}

		const rateLimit = await consumeIpRateLimit({
			scope: 'contact',
			maxRequests: 2,
			windowSeconds: 60 * 60
		});
		if (rateLimit.isLimited) return { result: 'rateLimited' } as const;

		const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO_EMAIL } =
			smtpEnv.data;
		const transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: SMTP_PORT === 465,
			auth: { user: SMTP_USER, pass: SMTP_PASS }
		});

		await transporter.sendMail({
			from: { name: 'Portfolio Contact', address: SMTP_FROM },
			replyTo: { name, address: email },
			to: CONTACT_TO_EMAIL,
			subject: `[Portfolio] ${subject || `Message from ${name}`}`,
			text: `From: ${name} <${email}>\n\n${message}`
		});
		console.log(`contact: message sent from ${email}`);

		return { result: 'sent' } as const;
	});
