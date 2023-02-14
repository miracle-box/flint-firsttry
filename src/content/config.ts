import { z, defineCollection } from 'astro:content';

const news = defineCollection({
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		author: z.string(),
		image: z.string().url(),
		date: z.string().datetime(),
	}),
	// Remove the leading year (i.e. [2023/]something.md)
	slug: ({ defaultSlug }) => defaultSlug.slice(5),
});

const docs = defineCollection({
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		outdated: z.boolean().optional(),
	}),
	// Remove the leading country code (i.e. [zh/]something.md)
	slug: ({ defaultSlug }) => defaultSlug.split('/').splice(1, Number.POSITIVE_INFINITY).join('/'),
});
export const collections = {
	news,
	docs,
};
