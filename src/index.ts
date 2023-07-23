import type { FlintConfig, RawFlintConfig } from './types';
import type { AstroIntegration, AstroUserConfig, ViteUserConfig } from 'astro';
import { FlintConfigSchema } from './utils/config';
import { getModuleRoutes } from './utils/route';

export default function Flint(rawFlintConfig: RawFlintConfig): AstroIntegration[] {
	// Parse user config
	const parsedFlintConfig = FlintConfigSchema.safeParse(rawFlintConfig);
	if (!parsedFlintConfig.success)
		throw new Error('Failed to parse Flint configurations: ' + parsedFlintConfig.error.message);

	const flintConfig = parsedFlintConfig.data;

	// Astro integration
	const Flint: AstroIntegration = {
		name: 'flint',
		hooks: {
			'astro:config:setup'({ updateConfig, injectRoute }) {
				const newConfig: AstroUserConfig = {
					vite: {
						plugins: [vitePluginFlint(flintConfig)],
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

	return [Flint];
}

function vitePluginFlint(flintConfig: FlintConfig): NonNullable<ViteUserConfig['plugins']>[number] {
	const resolveVirtualModuleId = (id: string) => '\0' + id;

	const virtualModules: Record<string, string> = {
		// Export flint config as a virtual module (like the way Starlight did)
		'virtual:flint/config': `export default ${JSON.stringify(flintConfig)}`,
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
