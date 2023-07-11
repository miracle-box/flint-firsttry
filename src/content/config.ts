import type { NewsTags } from '~/types';
import { z, defineCollection } from 'astro:content';
import { siteConfig } from '~/config';

const news = defineCollection({
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		author: z.string(),
		image: z.string().url(),
		date: z.string().datetime(),
		tags: z
			.enum(Object.keys(siteConfig.news.tags) as NewsTags)
			.array()
			.nonempty(),
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
