import { defineCollection } from 'astro:content';
import { docsSchema } from '~/schemas/docs';
import { newsSchema } from '~/schemas/news';

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
