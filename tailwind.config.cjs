/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{html,js}",
		"./node_modules/tw-elements/dist/js/**/*.js",
	],
	theme: {
		colors: {
			primary: "rgb(58, 66, 60)",
			black: "#000000",
			// white: "rgb(242, 242, 242)",
			white: "#ffffff",
			orange: "#ff4d00",
			red: "#FF0000"
		},
		extend: {
			width: {
				"128": "28rem",
			},
		},
	},
	plugins: [require("tw-elements/dist/plugin")],
};
