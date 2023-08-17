import { z } from 'astro/zod';
import { tSchema } from '../utils/i18n-translation';

export const FlintTranslationSchema = z.object({
	site: z.object({
		logotype: tSchema(),
		logoAlt: tSchema(),
		title: tSchema(),
	}),
	navItems: z.object({
		news: tSchema(),
		docs: tSchema(),
		resources: tSchema(),
		guiluo: tSchema(),
	}),
	hero: z.object({
		title: tSchema(),
		desc: tSchema(),
		primaryButton: tSchema(),
		secondaryButton: tSchema(),
	}),
	notfound: z.object({
		title: tSchema(),
		body: tSchema(),
		button: tSchema(),
	}),
	docs: z.object({
		breadcrumbBase: tSchema(),
		fallbackTip: tSchema().args(z.string(), z.string()),
		outdatedTip: tSchema(),
		outdatedTranslationTip: z.tuple([tSchema(), tSchema().args(z.string()), tSchema(), tSchema()]),
		tocHeading: tSchema(),
	}),
	news: z.object({
		breadcrumbBase: tSchema(),
	}),
});

export const FlintTranslationExtendSchema = FlintTranslationSchema.deepPartial();

export type FlintTranslation = z.infer<typeof FlintTranslationSchema>;
export type FlintTranslationExtend = z.infer<typeof FlintTranslationExtendSchema>;
