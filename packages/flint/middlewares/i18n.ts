import { defineMiddleware } from 'astro/middleware';
import { CustomDict, FlintDict, getLocaleFromUrl } from '../utils';

const flintDict = new FlintDict();
const customDict = new CustomDict();

export const flintI18nMiddleware = defineMiddleware(async (ctx, next) => {
	const locale = getLocaleFromUrl(ctx.url.pathname);
	ctx.locals.locale = locale;
	ctx.locals.translations = flintDict.useTranslation(locale);
	// @ts-expect-error We do not know about the user defined type
	ctx.locals.customTranslations = customDict.useTranslation(locale);

	const response = await next();
	return response;
});
