import type { customSchema } from 'virtual:flint/user-translation';
import { z } from 'astro/zod';

export function tSchema() {
	return z.function().returns(z.string());
}

export const FlintTranslationSchema = z.object({
	site: z.object({
		logotype: tSchema(),
		logoAlt: tSchema(),
		title: tSchema(),
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
export type CustomTranslation = z.infer<typeof customSchema>;

const FlintUserTranslationSchema = FlintTranslationSchema.deepPartial();
export type FlintUserDictionary = Record<string, z.infer<typeof FlintUserTranslationSchema>>;
