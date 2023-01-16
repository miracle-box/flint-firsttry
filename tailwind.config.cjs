/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			accent: colors.violet,
			success: colors.lime,
			warning: colors.yellow,
			danger: colors.red,
			info: colors.sky,
		},
	},
	plugins: [],
};
