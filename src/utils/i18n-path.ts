import type { Locales } from '~/types';
import Config from 'virtual:flint/config';
import { getPathname } from './route';

export const locales = Object.keys(Config.locales);

/**
 * Remove `BASE_URL` from pathname (`/base/locale/path/page/` => `locale/path/page/`)
 * @param pathname pathname
 * @returns pathname without leading `BASE_URL`
 */
function removeBase(pathname: string): string {
	return pathname.slice(getPathname().length);
}

/**
 * Check whether a locale code is valid.
 * @param locale Locale code to check
 * @returns whecher the locale code is valid
 */
export function isValidLocale(locale: string): boolean {
	return locales.includes(locale);
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
		if (isValidLocale(split[0]!)) return split[0]!;

		// Throws an error on invalid locales.
		throw new Error(`Can't determine locale for ${pathname}. Did you have typos in filename?`);
	}

	// Special workaround for main page. (`[locale]/index.astro`)
	if (split.length === 2 && isValidLocale(split[0]!)) return split[0]!;

	return Config.defaultLocale;
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

	return getPathname() + pagePath.replace(ogLocale, locale);
}
