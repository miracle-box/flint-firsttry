import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';

export default defineConfig({
	trailingSlash: 'always',
	integrations: [
		mdx(),
		tailwind({
			config: { applyBaseStyles: false },
		}),
		solidJs(),
	],
	markdown: {
		shikiConfig: {
			theme: 'github-light',
		},
	},
});
