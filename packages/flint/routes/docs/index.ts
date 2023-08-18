import type { InjectedRoute } from 'astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

export function docsRoutes(base: string): InjectedRoute[] {
	return [
		{
			entryPoint: path.join(dir, 'index.astro'),
			pattern: `[locale]/${base}`,
		},
		{
			entryPoint: path.join(dir, '[...slug].astro'),
			pattern: `[locale]/${base}/[...slug]`,
		},
	];
}
