import type { Locales } from '~/types';

export function getUrl(locale?: Locales, path?: string, page?: string): string {
	let url = `${import.meta.env.BASE_URL}`;

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
