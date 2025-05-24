/** @type {import('tailwindcss').Config} */
module.exports = {
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
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
