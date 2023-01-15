import { z, defineCollection } from 'astro:content';

const news = defineCollection({
	schema: {
		title: z.string(),
		desc: z.string(),
		author: z.string(),
		image: z.string().url(),
		date: z.string().datetime(),
	},
	// Remove the leading year (i.e. [2023/]something.md)
	slug: ({ defaultSlug }) => defaultSlug.slice(5),
});

export const collections = {
	news,
};
