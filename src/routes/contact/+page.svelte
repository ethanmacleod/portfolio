<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import RetroDiv from '$lib/components/RetroDiv.svelte';
	import { socials, status, statusColors, statusDotClasses } from '$lib/config/contact';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		resetForm: true
	});

	const statusColor = statusColors[status.state];
	const dotClass = statusDotClasses[status.state];

	const sent = $derived($message === 'Message sent successfully.');
</script>

<svelte:head>
	<title>Contact - Ethan MacLeod</title>
	<meta name="description" content="Get in touch with me" />
</svelte:head>

<div class="flex h-full min-h-0 gap-4">
	<div class="flex min-w-0 flex-1 flex-col gap-3">
		<RetroDiv width="w-full" className="shrink-0 p-3">
			<h1 class="font-mono text-base font-bold text-blue-700">// CONTACT</h1>
			<p class="mt-1 font-mono text-xs text-gray-600">
				Fill out the form below and I'll get back to you.
			</p>
		</RetroDiv>

		<RetroDiv width="w-full" className="flex-1 overflow-auto p-4">
			{#if sent}
				<div
					class="bevel-inset flex h-full flex-col items-center justify-center gap-3 bg-green-50 p-8"
				>
					<span class="font-mono text-2xl">✓</span>
					<p class="font-mono text-sm font-bold text-green-700">MESSAGE SENT SUCCESSFULLY</p>
					<p class="font-mono text-xs text-gray-600">I'll get back to you within ~24 hours.</p>
				</div>
			{:else}
				<form method="POST" use:enhance class="flex flex-col gap-3">
					{#if $message && !sent}
						<div class="bevel-inset bg-red-50 p-2">
							<p class="font-mono text-xs text-red-700">{$message}</p>
						</div>
					{/if}

					<div class="grid grid-cols-2 gap-3">
						<div class="flex flex-col gap-1">
							<label for="name" class="font-mono text-xs font-bold text-gray-700">NAME *</label>
							<input
								id="name"
								name="name"
								type="text"
								bind:value={$form.name}
								maxlength="100"
								class="bevel-inset bg-white px-2 py-1.5 font-mono text-xs text-gray-800 outline-none"
								placeholder="Your name"
							/>
							{#if $errors.name}
								<span class="font-mono text-xs text-red-600">{$errors.name[0]}</span>
							{/if}
						</div>
						<div class="flex flex-col gap-1">
							<label for="email" class="font-mono text-xs font-bold text-gray-700">EMAIL *</label>
							<input
								id="email"
								name="email"
								type="email"
								bind:value={$form.email}
								maxlength="200"
								class="bevel-inset bg-white px-2 py-1.5 font-mono text-xs text-gray-800 outline-none"
								placeholder="you@example.com"
							/>
							{#if $errors.email}
								<span class="font-mono text-xs text-red-600">{$errors.email[0]}</span>
							{/if}
						</div>
					</div>

					<div class="flex flex-col gap-1">
						<label for="subject" class="font-mono text-xs font-bold text-gray-700">SUBJECT</label>
						<input
							id="subject"
							name="subject"
							type="text"
							bind:value={$form.subject}
							maxlength="200"
							class="bevel-inset bg-white px-2 py-1.5 font-mono text-xs text-gray-800 outline-none"
							placeholder="What's this about?"
						/>
						{#if $errors.subject}
							<span class="font-mono text-xs text-red-600">{$errors.subject[0]}</span>
						{/if}
					</div>

					<div class="flex flex-col gap-1">
						<label for="message" class="font-mono text-xs font-bold text-gray-700">MESSAGE *</label>
						<textarea
							id="message"
							name="message"
							bind:value={$form.message}
							maxlength="5000"
							rows="8"
							class="bevel-inset resize-none bg-white px-2 py-1.5 font-mono text-xs text-gray-800 outline-none"
							placeholder="Write your message here..."
						></textarea>
						{#if $errors.message}
							<span class="font-mono text-xs text-red-600">{$errors.message[0]}</span>
						{/if}
					</div>

					<div class="flex items-center justify-between">
						<span class="font-mono text-xs text-gray-500">* required fields</span>
						<button
							type="submit"
							disabled={$submitting}
							class="bevel-button bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-mono text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{$submitting ? 'SENDING...' : 'SEND MESSAGE'}
						</button>
					</div>
				</form>
			{/if}
		</RetroDiv>
	</div>

	<div class="flex w-72 shrink-0 flex-col gap-3">
		<RetroDiv width="w-full" className="shrink-0 p-3">
			<h2 class="mb-2 font-mono text-xs font-bold text-gray-600">[ CURRENT STATUS ]</h2>
			<div class="bevel-inset bg-black p-3">
				<div class="flex items-center gap-2">
					<span class="blink h-2.5 w-2.5 shrink-0 rounded-full {dotClass}"></span>
					<span class="neon-glow font-mono text-sm font-bold" style="color: {statusColor}">
						{status.label}
					</span>
				</div>
				<p class="mt-2 font-mono text-xs text-gray-400">{status.detail}</p>
				<div class="mt-3 flex flex-col gap-1 border-t border-gray-700 pt-2">
					<div class="flex justify-between">
						<span class="font-mono text-xs text-gray-500">TIMEZONE</span>
						<span class="font-mono text-xs text-green-400">{status.timezone}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-mono text-xs text-gray-500">RESPONSE</span>
						<span class="font-mono text-xs text-green-400">{status.response}</span>
					</div>
				</div>
			</div>
		</RetroDiv>

		<RetroDiv width="w-full" className="flex-1 p-3">
			<h2 class="mb-2 font-mono text-xs font-bold text-gray-600">[ FIND ME ELSEWHERE ]</h2>
			<div class="flex flex-col gap-2">
				{#each socials as social (social.label)}
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						class="bevel-button flex items-center gap-3 bg-[#c0c0c0] px-3 py-2 transition-colors hover:bg-[#d0d0d0]"
					>
						<span style="color: {social.color}" class="shrink-0">
							<social.Icon className="h-4 w-4 fill-current" />
						</span>
						<span class="font-mono text-xs font-bold text-gray-800">{social.label}</span>
						<span class="ml-auto font-mono text-xs text-gray-500">→</span>
					</a>
				{/each}
			</div>
		</RetroDiv>
	</div>
</div>
