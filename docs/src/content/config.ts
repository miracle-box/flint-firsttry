import { docsSchema, i18nSchema } from '@miracle-box/flint/schemas';
import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
	type: 'content',
	schema: docsSchema(),
});

const i18n = defineCollection({
	type: 'data',
	schema: i18nSchema(
		z.object({
			hero: z.object({
				title: z.string(),
				desc: z.string(),
				primaryButton: z.string(),
				secondaryButton: z.string(),
			}),
		}),
	),
});

export const collections = {
	docs,
	i18n,
};
