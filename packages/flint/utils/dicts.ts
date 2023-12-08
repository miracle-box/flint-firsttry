import type { z } from 'astro/zod';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import extend from 'just-extend';
import Config from 'virtual:flint/config';
import { flintDict } from '../i18n';
import { flintTranslationSchema } from '../schemas/i18n';

const internalTranslationSchema = flintTranslationSchema();
const userDict = await getCollection('i18n');

type UserTranslation = CollectionEntry<'i18n'>['data'];
type FlintTranstion = z.infer<typeof internalTranslationSchema>;
type FullTranslation = Pick<UserTranslation, 'custom'> & FlintTranstion;

let defaults: FullTranslation = buildDefaults();
let store: Record<string, FullTranslation> | undefined;

export function useTranslation(locale: string): FullTranslation {
	if (import.meta.env.DEV) {
		defaults = buildDefaults();
		return buildDict(locale);
	}

	if (!store) {
		store = {};
		for (const locale of Object.keys(Config.locales)) {
			store[locale] = buildDict(locale);
		}
	}

	return store[locale]!;
}

function buildDefaults(): FullTranslation {
	const defaultUserTranslation = userDict.find((trans) => trans.id === Config.defaultLocale)?.data;

	if (Object.entries(userDict[0]?.data.custom ?? {}).length > 0 && !defaultUserTranslation) {
		throw new Error('You should provide translations for custom i18n entries of your default locale.');
	}

	return extend(
		true,
		{},
		flintDict.en,
		flintDict[Config.defaultLocale],
		defaultUserTranslation,
	) as FullTranslation;
}

function buildDict(locale: string): FullTranslation {
	return extend(
		true,
		{},
		defaults,
		flintDict[locale],
		userDict.find((trans) => trans.id === locale)?.data,
	) as FullTranslation;
}
