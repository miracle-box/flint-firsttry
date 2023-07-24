import { z, defineCollection } from 'astro:content';

const news = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		author: z.string(),
		image: z.string().url(),
		date: z.string().datetime({ offset: true, precision: 0 }),
		tags: z.string().array().nonempty(),
	}),
});

const docs = defineCollection({
	type: 'content',
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
