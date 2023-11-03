import { z } from 'astro/zod';
import { tSchema } from '../utils/i18n-translation';

export const FlintTranslationSchema = z.object({
	site: z.object({
		logotype: tSchema(),
		logoAlt: tSchema(),
		title: tSchema(),
	}),
	navItems: z.object({
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
});
export type FlintTranslation = z.infer<typeof FlintTranslationSchema>;

const FlintUserTranslationSchema = FlintTranslationSchema.deepPartial();
export type FlintUserDictionary = Record<string, z.infer<typeof FlintUserTranslationSchema>>;
