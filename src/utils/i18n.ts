import { siteConfig } from '@config';
import { loadLocaleAsync } from 'src/i18n/i18n-util.async';
import { loadLocale as loadLocaleSync } from '../i18n/i18n-util.sync';
import { locales } from '../i18n/i18n-util';
import type { Locales } from '../i18n/i18n-types';

export { locales, i18nObject } from '../i18n/i18n-util';

/**
 * Get the locale code from url.
 *
 * **Note: Pages that does not match the `XX` or `XX-XX` format will be treated as default locale pages**
 *
 * @param pathname path (`/locale/...` or `locale/...`)
 * @returns locale code
 */
export function getLocaleFromUrl(pathname: string): Locales {
	const matcher = /^\/?([a-z]{2}-?[a-z]{0,2})\//;
	const langMatches = matcher.exec(pathname) ?? [];

	if (!locales.includes(langMatches[1] as Locales)) return siteConfig.site.defaultLocale;
	return langMatches[1] as Locales;
}

/**
 * Check whether a url under certain locale
 * @param url url to check
 * @param locale target locale
 * @returns Is `url` under `locale`
 */
export function isUrlOfLocale(url: string, locale: Locales): boolean {
	return url.replace(/^\//, '').startsWith(locale + '/');
}

/**
 * Replace the locale of a pathname with another locale, returns `/` when the pathname is not valid
 * @param pathname path to replace
 * @param locale target locale
 * @returns New pathname or root path (`/`)
 */
export function replacePathLocale(pathname: string, locale: Locales): string {
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
