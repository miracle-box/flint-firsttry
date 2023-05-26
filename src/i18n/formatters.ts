import type { FormattersInitializer } from 'typesafe-i18n';
import type { Locales, Formatters } from './i18n-types.js';
import { localeNames } from '~/config.js';

export const initFormatters: FormattersInitializer<Locales, Formatters> = (_locale: Locales) => {
	const formatters: Formatters = {
		/**
		 * Get the corresponding locale name for a locale.
		 * @param localeCode Locale code
		 * @returns Locale name
		 */
		localeName: (localeCode: Locales): string => localeNames[localeCode],
	};

	return formatters;
};
