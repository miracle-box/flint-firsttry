import type { FlintTranslation } from '~/i18n/schema';
import extend from 'just-extend';
import Config from 'virtual:flint/config';
import { flintDicts } from '~/i18n';
import { FlintTranslationSchema } from '~/i18n/schema';

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
	return parseFlintDict(extend(true, {}, flintDicts.en, flintDicts[Config.defaultLocale]) as FlintTranslation);
}

function buildDict(locale: string): FlintTranslation {
	return parseFlintDict(extend(true, {}, defaults, flintDicts[locale]) as FlintTranslation);
}

export function useTranslation(locale: string): FlintTranslation {
	if (import.meta.env.DEV) {
		defaults = buildDefaults();
		return buildDict(locale);
	}

	return store[locale]!;
}
