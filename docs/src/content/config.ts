import { docsSchema, newsSchema } from '@miracle-box/flint/schema';
import { defineCollection } from 'astro:content';

const news = defineCollection({
	type: 'content',
	schema: newsSchema,
});

const docs = defineCollection({
	type: 'content',
	schema: docsSchema,
});

export const collections = {
	news,
	docs,
};
