import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './app.html'],
	theme: {
		extend: {
			backgroundImage: {
				paper: "url('/background.png')"
			},
			colors: {
				lightYellow: '#ffffcb'
			},
			fontFamily: {
				mono: ['Courier New', 'monospace']
			}
		}
	},
	plugins: [forms, typography]
};
