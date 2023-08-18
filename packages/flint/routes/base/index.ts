import type { InjectedRoute } from 'astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

export function baseRoutes(): InjectedRoute[] {
	return [
		{
			entryPoint: path.join(dir, 'index.astro'),
			pattern: '',
		},
		{
			entryPoint: path.join(dir, '404.astro'),
			pattern: `404`,
		},
		{
			entryPoint: path.join(dir, '[locale]/index.astro'),
			pattern: `[locale]`,
		},
		{
			entryPoint: path.join(dir, '[locale]/404.astro'),
			pattern: `[locale]/404`,
		},
	];
}
