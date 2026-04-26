<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { Writable, Readable } from 'svelte/store';
	import { derived } from 'svelte/store';
	import { guestbookSchema } from '$lib/schema.js';

	type ErrorType =
		| 'RATE_LIMIT'
		| 'TOO_LONG_NAME'
		| 'TOO_LONG_MESSAGE'
		| 'TOO_LONG_LOCATION'
		| 'SWEAR_WORDS_NAME'
		| 'SWEAR_WORDS_MESSAGE'
		| 'SWEAR_WORDS_LOCATION';

	const errorMessages: Record<ErrorType, string> = {
		RATE_LIMIT: 'Too many messages... perhaps an email might get your point across better?',
		TOO_LONG_NAME: 'Thats not your name buddy',
		TOO_LONG_MESSAGE: 'What are you writing? An essay? Pls stop',
		TOO_LONG_LOCATION: 'Are you by chance welsh?',
		SWEAR_WORDS_NAME:
			'Maybe people call you those words in private but I wont let you call yourself that. Just looking out for you bud',
		SWEAR_WORDS_MESSAGE:
			'Cmon man the website might not look professional but theres no need for all that',
		SWEAR_WORDS_LOCATION: 'Surely not.'
	};

	export let form: Writable<{ name: string; message: string; location?: string }>;
	export let enhance: Action<HTMLFormElement>;
	export let submitting: Readable<boolean>;
	export let serverMessage: string;

	const clientValidation = derived(form, ($formData) => {
		if (!$formData.name && !$formData.message && !$formData.location) return null;
		try {
			guestbookSchema.parse($formData);
			return null;
		} catch (error: unknown) {
			const zodError = error as { issues?: { message: string }[] };
			if (zodError.issues) {
				for (const issue of zodError.issues) {
					if (issue.message === 'TOO_LONG_NAME') return 'TOO_LONG_NAME';
					if (issue.message === 'TOO_LONG_MESSAGE') return 'TOO_LONG_MESSAGE';
					if (issue.message === 'TOO_LONG_LOCATION') return 'TOO_LONG_LOCATION';
					if (issue.message === 'SWEAR_WORDS_NAME') return 'SWEAR_WORDS_NAME';
					if (issue.message === 'SWEAR_WORDS_MESSAGE') return 'SWEAR_WORDS_MESSAGE';
					if (issue.message === 'SWEAR_WORDS_LOCATION') return 'SWEAR_WORDS_LOCATION';
				}
			}
			return null;
		}
	});

	$: currentError = ((): ErrorType | null => {
		if (serverMessage?.includes('maximum number of guestbook entries')) return 'RATE_LIMIT';
		if (serverMessage) {
			if (serverMessage.includes('too long')) {
				if (serverMessage.includes('name')) return 'TOO_LONG_NAME';
				if (serverMessage.includes('message')) return 'TOO_LONG_MESSAGE';
				if (serverMessage.includes('location')) return 'TOO_LONG_LOCATION';
			}
			return null;
		}
		return $clientValidation as ErrorType | null;
	})();
</script>

<div class="bevel-button inline-block bg-gray-200 p-3">
	<form class="flex flex-wrap items-center gap-2" method="POST" action="?/addEntry" use:enhance>
		<span class="text-sm font-bold">Name:</span>
		<input
			type="text"
			name="name"
			class="bevel-inset px-2 py-1 text-sm"
			placeholder="Your name"
			bind:value={$form.name}
			required
		/>
		<span class="text-sm font-bold">Location:</span>
		<input
			type="text"
			name="location"
			class="bevel-inset px-2 py-1 text-sm"
			placeholder="Optional"
			bind:value={$form.location}
		/>
		<span class="text-sm font-bold">Message:</span>
		<input
			type="text"
			name="message"
			class="bevel-inset flex-1 px-2 py-1 text-sm"
			placeholder="Leave a message!"
			bind:value={$form.message}
			required
		/>
		<button
			type="submit"
			class="bevel-button bg-blue-500 px-3 py-1 text-sm font-bold text-white {$submitting
				? 'cursor-not-allowed opacity-50'
				: ''}"
			disabled={$submitting}
		>
			{$submitting ? 'Signing...' : 'Sign!'}
		</button>
	</form>
	{#if currentError}
		{@const errorInfo = errorMessages[currentError]}
		<div class="bevel-inset mt-3 border-2 p-3 text-sm">
			<div class="flex items-center gap-2 text-center">
				<span class="text-center">{errorInfo}</span>
			</div>
		</div>
	{/if}
</div>
