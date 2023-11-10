import { defineMiddleware } from 'astro/middleware';
import { getLocaleFromUrl } from '../../utils/i18n-path';
import { FlintDict, CustomDict } from './dict-builder';

const flintDict = new FlintDict();
const customDict = new CustomDict();

export const flintI18nMiddleware = defineMiddleware(async (ctx, next) => {
	const locale = getLocaleFromUrl(ctx.url.pathname);
	ctx.locals.locale = locale;
	ctx.locals.translations = flintDict.useTranslation(locale);
	// @ts-expect-error We do not know about the user defined type
	ctx.locals.customTranslations = customDict.useTranslation(locale);

	return next();
});
