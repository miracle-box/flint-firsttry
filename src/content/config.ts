import { z, defineCollection } from 'astro:content';

const news = defineCollection({
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		author: z.string(),
		image: z.string().url(),
		date: z.string().datetime(),
	}),
});

export const collections = {
	news,
};
