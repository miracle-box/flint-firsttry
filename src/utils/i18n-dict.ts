import type { BuiltinDict } from '~/i18n/schema';
import extend from 'just-extend';
import { BuiltinDictSchema } from '~/i18n/schema';
// eslint-disable-next-line import/order
import en from '~/i18n/en';
import zh from '~/i18n/zh';

const builtinDicts: Record<string, BuiltinDict> = {
	en: BuiltinDictSchema.parse(en),
	zh: BuiltinDictSchema.parse(zh),
};

const defaults = extend(true, builtinDicts.en as Record<string, unknown>, {}) as BuiltinDict;

export function useTranslation(locale: string): BuiltinDict {
	return extend(defaults, builtinDicts[locale]) as BuiltinDict;
}
