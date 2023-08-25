import { defineMiddleware } from 'astro/middleware';
import { getLocaleFromUrl, useTranslation } from '../utils';

export const flintI18nMiddleware = defineMiddleware(async (ctx, next) => {
	const locale = getLocaleFromUrl(ctx.url.pathname);
	ctx.locals.locale = locale;
	ctx.locals.translations = useTranslation(locale);

	const response = await next();
	return response;
});
