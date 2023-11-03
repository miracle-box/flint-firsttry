import type { FlintTranslation } from '../schemas/i18n';
import extend from 'just-extend';
import Config from 'virtual:flint/config';
import { flintUserDict } from 'virtual:flint/user-translation';
import { flintDict } from '../i18n';
import { FlintTranslationSchema } from '../schemas/i18n';

let defaults = buildDefaults();

// Prebuild all dicts in production env
const store: Record<string, FlintTranslation> = {};
for (const locale of Object.keys(Config.locales)) {
	store[locale] = buildDict(locale);
}

function parseFlintDict(dict: FlintTranslation) {
	return FlintTranslationSchema.parse(dict);
}

function buildDefaults(): FlintTranslation {
	return parseFlintDict(
		extend(
			true,
			{},
			flintDict.en,
			flintDict[Config.defaultLocale],
			flintUserDict[Config.defaultLocale],
		) as FlintTranslation,
	);
}

function buildDict(locale: string): FlintTranslation {
	return parseFlintDict(extend(true, {}, defaults, flintDict[locale], flintUserDict[locale]) as FlintTranslation);
}

export function useTranslation(locale: string): FlintTranslation {
	if (import.meta.env.DEV) {
		defaults = buildDefaults();
		return buildDict(locale);
	}

	return store[locale]!;
}
