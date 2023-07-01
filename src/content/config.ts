import { z, defineCollection } from 'astro:content';

const news = defineCollection({
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		author: z.string(),
		image: z.string().url(),
		date: z.string().datetime(),
		tags: z.string().array(),
	}),
});

const docs = defineCollection({
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		outdated: z.boolean().default(false).optional(),
		outdated_translation: z.union([z.string().url(), z.literal(false)]).optional(),
	}),
});

export const collections = {
	news,
	docs,
};
