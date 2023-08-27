import { z } from 'astro/zod';
import { tSchema } from '../utils/i18n-translation';

export const FlintInternalTranslationSchema = z.object({
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
export type FlintInternalTranslation = z.infer<typeof FlintInternalTranslationSchema>;

export const FlintTranslationSchema = FlintInternalTranslationSchema.extend({
	custom: z.record(z.function().returns(z.string())),
});
export type FlintTranslation = z.infer<typeof FlintTranslationSchema>;

const FlintExtendedTranslationSchema = FlintTranslationSchema.deepPartial();
export type FlintExtendedDictionary = Record<string, z.infer<typeof FlintExtendedTranslationSchema>>;
