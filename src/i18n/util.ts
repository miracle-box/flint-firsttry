import { L as i18nNode } from './i18n-node';
import type { Locales } from './i18n-types';

/**
 * Get the locale code from url.
 * @param pathname path of the page
 * @returns locale code
 */
export function getLocaleFromUrl(pathname: string): Locales {
	const matcher = /\/([a-z]{2}-?[a-z]{0,2})\//;
	const langMatches = matcher.exec(pathname) ?? [];

	return (langMatches[1] ?? 'zh') as Locales;
}

/**
 * Get the i18n helper object of certain locale.
 * @param locale locale code
 * @returns an object of type i18n you can use inside your code.
 */
export function getI18nHelper(locale: Locales) {
	return i18nNode[locale];
}
