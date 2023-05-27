import { loadLocaleAsync } from 'src/i18n/i18n-util.async';
import { loadLocale as loadLocaleSync } from '../i18n/i18n-util.sync';
import { locales } from '../i18n/i18n-util';
import type { Locales } from '../i18n/i18n-types';
import { siteConfig } from '~/config';

export { locales, i18nObject } from '../i18n/i18n-util';

/**
 * Check whether a locale code is valid.
 * @param locale Locale code to check
 * @returns whecher the locale code is valid
 */
export function isValidLocale(locale: string): locale is Locales {
	return locales.includes(locale as Locales);
}

/**
 * Get the locale code from url.
 *
 * @param pathname path (`/locale/...` or `locale/...`)
 * @returns locale code
 */
export function getLocaleFromUrl(pathname: string): Locales {
	const split = pathname.split('/');

	// In a localized sub dir. (e.g. /zh/xxx)
	if (split.length > 3) {
		if (isValidLocale(split[1]!)) return split[1];

		// Throws an error on invalid locales.
		throw new Error(`Can't determine locale for ${pathname}. Did you have typos in filename?`);
	}

	// Special workaround for main page. (`pages/[locale]/index.astro`)
	if (split.length === 3 && isValidLocale(split[1]!)) return split[1];

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
