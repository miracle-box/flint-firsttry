import type { FormattersInitializer } from 'typesafe-i18n';
import type { Locales, Formatters } from './i18n-types.js';

// @ts-expect-error We do not have any formatters now, let's suppress the unused args error.
// And, remember to remove the comments after adding the formatters.
export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {
	const formatters: Formatters = {};

	return formatters;
};
