import { flintTranslationSchema } from '../schemas/i18n';
import en from './en.json';
import zh from './zh.json';

const { parse } = flintTranslationSchema();

export const flintDict = Object.fromEntries(
	Object.entries({
		en,
		zh,
	}).map(([key, trans]) => [key, parse(trans)]),
);
