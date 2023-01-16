import { siteConfig } from '@config';
import { L as i18nNode } from '../i18n/i18n-node';
import type { Locales } from '../i18n/i18n-types';
import { locales } from '../i18n/i18n-util';

export { locales } from '../i18n/i18n-util';
export type { Locales } from '../i18n/i18n-types';

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

	if (!locales.includes(langMatches[1] as Locales)) return siteConfig.defaultLocale;
	return langMatches[1] as Locales;
}

/**
 * Get the i18n helper object of certain locale.
 * @param locale locale code
 * @returns an object of type i18n you can use inside your code.
 */
export function getI18nHelper(locale: Locales) {
	return i18nNode[locale];
}
