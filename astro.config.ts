import mdx from '@astrojs/mdx';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

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
