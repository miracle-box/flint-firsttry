import type { InjectedRoute } from 'astro';
import type { Locales } from '~/types';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

/**
 * Get pathname with `BASE_URL` prepended
 * @param path path relative to `BASE_URL` (with or without leading slash)
 * @returns `BASE_URL` + `path`
 */
export function getPathname(path = ''): string {
	if (path.startsWith('/')) path = path.slice(1);
	return import.meta.env.BASE_URL + path;
}

/**
 * Get the pathname of a page
 * @param locale locale of the page
 * @param path path (catrgory) of the page
 * @param page name (slug) of the page
 * @returns pathname of the page
 */
export function getPagePath(locale: Locales, path?: string, page?: string): string {
	let url = import.meta.env.BASE_URL;

	// Locale
	if (locale) url += `${locale}/`;
	else return url;

	// Path
	if (path) url += `${path}/`;
	else return url;

	// Page
	if (page) url += `${page}/`;
	else return url;

	return url;
}

/**
 * Normalize a path and replace back slashes with forward slashes
 * @param p path to convert
 * @returns path that matches Unix form
 */
function toUnixPath(p: string) {
	return path.normalize(p).split('\\').join('/');
}

/**
 * Get route entries of a module
 * @param module module name (`docs` or `news`)
 * @param basePath base route path (like /zh/`[xxx]`/)
 * @returns An array of objects for `injectRoute`
 */
export function getModuleRoutes(module: 'docs' | 'news', basePath: string): InjectedRoute[] {
	const moduleDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../routes', module);
	const patternBase = `[locale]/${basePath}/`;

	const paths = fs
		// Get file list
		.readdirSync(moduleDir, { recursive: true })
		// Exclude directories
		.map((p) => {
			return fs.statSync(path.join(moduleDir, p.toString())).isFile()
				? toUnixPath(p.toString())
				: null;
		})
		.filter(Boolean) as string[];

	return paths.map((p) => ({
		entryPoint: toUnixPath(path.join(moduleDir, p)),
		// Convert `xxx/index.astro` to `xxx`, `xxx/route.astro` to `xxx/route`
		pattern: (patternBase + p).replace(/(.*)\/index|(.*)\.astro/g, '$1$2'),
	}));
}
