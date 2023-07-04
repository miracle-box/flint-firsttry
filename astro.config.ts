import mdx from '@astrojs/mdx';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import icons from 'unplugin-icons/vite';
// eslint-disable-next-line import/order
import { defineConfig } from 'astro/config';

export default defineConfig({
	trailingSlash: 'always',
	integrations: [mdx(), tailwind({ applyBaseStyles: false }), solidJs()],
	markdown: {
		shikiConfig: {
			theme: 'github-light',
		},
	},
	vite: {
		plugins: [
			icons({
				compiler: 'solid',
			}),
		],
	},
});
