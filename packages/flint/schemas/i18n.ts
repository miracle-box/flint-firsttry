import { z } from 'astro/zod';

export const flintTranslationSchema = () =>
	z.object({
		site: z.object({
			logotype: z.string(),
			logoAlt: z.string(),
			title: z.string(),
		}),
		notfound: z.object({
			title: z.string(),
			body: z.string(),
			button: z.string(),
		}),
		docs: z.object({
			breadcrumbBase: z.string(),
			fallbackTip: z.string(),
			outdatedTip: z.string(),
			outdatedTranslationTip: z.tuple([z.string(), z.string(), z.string(), z.string()]),
			tocHeading: z.string(),
		}),
	});

export const i18nSchema = <T>(custom: z.ZodType<T>) => flintTranslationSchema().deepPartial().extend({ custom });
