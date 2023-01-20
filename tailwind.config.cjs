/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{html,js}",
		"./node_modules/tw-elements/dist/js/**/*.js",
	],
	theme: {
		colors: {
			primary: "#885E2D",
			black: "#000000",
			white: "#FFFFFF",
		},
		extend: {
			width: {
				"128": "28rem",
			},
		},
	},
	plugins: [require("tw-elements/dist/plugin")],
};
