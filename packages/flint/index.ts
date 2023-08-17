import type { FlintConfig, RawFlintConfig } from './types';
import type { AstroConfig, AstroIntegration, AstroUserConfig, ViteUserConfig } from 'astro';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import icons from 'unplugin-icons/vite';
import { FlintConfigSchema } from './utils/config';
import { getModuleRoutes } from './utils/route';

export default function flint(rawFlintConfig: RawFlintConfig): AstroIntegration[] {
	// Parse user config
	const parsedFlintConfig = FlintConfigSchema.safeParse(rawFlintConfig);
	if (!parsedFlintConfig.success)
		throw new Error('Failed to parse Flint configurations: ' + parsedFlintConfig.error.message);

	const flintConfig = parsedFlintConfig.data;

	// Astro integration
	const flint: AstroIntegration = {
		name: 'flint',
		hooks: {
			'astro:config:setup'({ config, updateConfig, injectRoute }) {
				const newConfig: AstroUserConfig = {
					trailingSlash: 'always',
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
							vitePluginFlint(config, flintConfig),
						],
					},
				};

				// Temp route, wait for refactor
				for (const route of [
					...getModuleRoutes('docs', 'docs'),
					...getModuleRoutes('news', 'news'),
				]) {
					injectRoute(route);
				}

				updateConfig(newConfig);
			},
		},
	};

	return [tailwind({ applyBaseStyles: false }), solidJs(), mdx(), flint];
}

function vitePluginFlint(
	astroConfig: AstroConfig,
	flintConfig: FlintConfig,
): NonNullable<ViteUserConfig['plugins']>[number] {
	const resolvePath = (path: string) => JSON.stringify(resolve(fileURLToPath(astroConfig.root), path));
	const resolveVirtualModuleId = (id: string) => '\0' + id;

	const virtualModules: Record<string, string> = {
		// Export flint config as a virtual module (like the way Starlight did)
		'virtual:flint/config': `export default ${JSON.stringify(flintConfig)}`,
		// Import i18n dicts from root directory.
		'virtual:flint/extended-translation': `export { default } from ${resolvePath(
			flintConfig.flintTranslationsPath,
		)}`,
	};

	return {
		name: 'vite-plugin-flint',
		resolveId(id): string | void {
			if (id in virtualModules) return resolveVirtualModuleId(id);
		},
		load(id): string | void {
			return Object.entries(virtualModules).find(
				([origId]) => id === resolveVirtualModuleId(origId),
			)?.[1];
		},
	};
}
