import { defineMiddleware } from 'astro/middleware';
import { getLocaleFromUrl } from '../utils';

export const flintI18nMiddleware = defineMiddleware(async (ctx, next) => {
	ctx.locals.locale = getLocaleFromUrl(ctx.url.pathname);
	const response = await next();
	return response;
});
