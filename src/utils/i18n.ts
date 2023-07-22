import type { Locales } from '~/i18n/i18n-types';
import { locales } from '~/i18n/i18n-util';
import { loadLocaleAsync } from '~/i18n/i18n-util.async';
import { loadLocale as loadLocaleSync } from '~/i18n/i18n-util.sync';
import { siteConfig } from '~/config';

export { locales, i18nObject } from '../i18n/i18n-util';

/**
 * Remove `BASE_URL` from pathname (`/base/locale/path/page/` => `locale/path/page/`)
 * @param pathname pathname
 * @returns pathname without leading `BASE_URL`
 */
function removeBase(pathname: string): string {
	const baseUrl = import.meta.env.BASE_URL;
	return pathname.slice(baseUrl.length);
}

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
 * @param pathname pathname (`/base/locale/(path)/(page)/`)
 * @returns locale code
 */
export function getLocaleFromUrl(pathname: string): Locales {
	const split = removeBase(pathname).split('/');

	// In a localized sub dir. (e.g. zh/xxx/)
	if (split.length > 2) {
		if (isValidLocale(split[0]!)) return split[0];

		// Throws an error on invalid locales.
		throw new Error(`Can't determine locale for ${pathname}. Did you have typos in filename?`);
	}

	// Special workaround for main page. (`[locale]/index.astro`)
	if (split.length === 2 && isValidLocale(split[0]!)) return split[0];

	return siteConfig.site.defaultLocale;
}

/**
 * Replace the locale of a pathname with another locale
 * @param pathname path to replace
 * @param locale target locale
 * @returns pathname with different locale
 */
export function changePathLocale(pathname: string, locale: Locales): string {
	const pagePath = removeBase(pathname);
	const ogLocale = getLocaleFromUrl(pathname);

	return import.meta.env.BASE_URL + pagePath.replace(ogLocale, locale);
}

/**
 * Load locale depending on the env type
 * @param locale locale code
 */
export async function loadLocale(locale: Locales) {
	if (import.meta.env.DEV) await loadLocaleAsync(locale);
	else loadLocaleSync(locale);
}
