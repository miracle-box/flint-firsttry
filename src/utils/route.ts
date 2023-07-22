import type { Locales } from '~/types';

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
