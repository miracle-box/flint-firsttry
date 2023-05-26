import { loadLocaleAsync } from 'src/i18n/i18n-util.async';
import { loadLocale as loadLocaleSync } from '../i18n/i18n-util.sync';
import { locales } from '../i18n/i18n-util';
import type { Locales } from '../i18n/i18n-types';
import { siteConfig } from '~/config';

export { locales, i18nObject } from '../i18n/i18n-util';

/**
 * Get the locale code from url.
 *
 * @param pathname path (`/locale/...` or `locale/...`)
 * @returns locale code
 */
export function getLocaleFromUrl(pathname: string): Locales {
	const split = pathname.split('/');

	// In a sub dir. (e.g. /zh/)
	if (split.length > 2) {
		if (split[1] ?? '' in locales) return split[1] as Locales;
		// Throws an error on invalid locales.
		throw new Error(`Can't determine the locale for ${pathname}. Did you have typo in filename?`);
	}

	return siteConfig.site.defaultLocale;
}

/**
 * Check whether a url under certain locale
 * @param url url to check
 * @param locale target locale
 * @returns Is `url` under `locale`
 */
export function isUrlUnderLocale(url: string, locale: Locales): boolean {
	return url.replace(/^\//, '').startsWith(locale + '/');
}

/**
 * Replace the locale of a pathname with another locale, returns `/` when the pathname is not valid
 * @param pathname path to replace
 * @param locale target locale
 * @returns New pathname or root path (`/`)
 */
export function changePathLocale(pathname: string, locale: Locales): string {
	if (!pathname.startsWith('/')) return '/';
	const splittedPath = pathname.split('/');
	if (splittedPath.length < 3) return '/';
	splittedPath[1] = locale;
	return splittedPath.join('/');
}

/**
 * Load locale depending on the env type
 * @param locale locale code
 */
export async function loadLocale(locale: Locales) {
	if (import.meta.env.DEV) await loadLocaleAsync(locale);
	else loadLocaleSync(locale);
}
