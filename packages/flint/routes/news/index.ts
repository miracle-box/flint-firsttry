import type { InjectedRoute } from 'astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

export function newsRoutes(base: string): InjectedRoute[] {
	return [
		{
			entryPoint: path.join(dir, 'index.astro'),
			pattern: `[locale]/${base}`,
		},
		{
			entryPoint: path.join(dir, '[...slug].astro'),
			pattern: `[locale]/${base}/[...slug]`,
		},
		{
			entryPoint: path.join(dir, 'tags/index.astro'),
			pattern: `[locale]/${base}/tags`,
		},
		{
			entryPoint: path.join(dir, 'tags/[tag]/index.astro'),
			pattern: `[locale]/${base}/tags/[tag]`,
		},
		{
			entryPoint: path.join(dir, 'tags/[tag]/[page].astro'),
			pattern: `[locale]/${base}/tags/[tag]/[page]`,
		},
	];
}
