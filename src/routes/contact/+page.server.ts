import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import { contactSchema } from '$lib/schema.js';
import type { PageServerLoad, Actions } from './$types';

const limiter = new RetryAfterRateLimiter({
	IP: [2, 'h']
});

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(contactSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(contactSchema));
		const status = await limiter.check(event);

		if (status.limited)
			return message(form, 'Too many messages sent. Please try again in an hour.', { status: 429 });
		if (!form.valid) return fail(400, { form });

		if (
			!env.SMTP_HOST ||
			!env.SMTP_USER ||
			!env.SMTP_PASS ||
			!env.SMTP_FROM ||
			!env.CONTACT_TO_EMAIL
		) {
			return message(
				form,
				'Contact form is not configured. Please try reaching out via social links.',
				{ status: 500 }
			);
		}

		const { name, email, subject, message: body } = form.data;

		const transporter = nodemailer.createTransport({
			host: env.SMTP_HOST,
			port: parseInt(env.SMTP_PORT ?? '587'),
			secure: parseInt(env.SMTP_PORT ?? '587') === 465,
			auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
		});

		await transporter.sendMail({
			from: `"Portfolio Contact" <${env.SMTP_FROM}>`,
			replyTo: `"${name}" <${email}>`,
			to: env.CONTACT_TO_EMAIL,
			subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
			text: `From: ${name} <${email}>\n\n${body}`,
			html: `
				<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
				<hr />
				<p>${body.replace(/\n/g, '<br>')}</p>
			`
		});

		return message(form, 'Message sent successfully.');
	}
};
