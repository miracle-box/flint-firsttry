/* eslint-disable new-cap */
import mdx from '@astrojs/mdx';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import icons from 'unplugin-icons/vite';
import Flint from './src';

export default defineConfig({
	trailingSlash: 'always',
	integrations: [
		mdx(),
		tailwind({ applyBaseStyles: false }),
		solidJs(),
		Flint({
			locales: {
				zh: {
					label: '中文',
				},
				en: {
					label: 'English',
				},
			},
			defaultLocale: 'zh',
		}),
	],
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
