import { docsSchema } from '@miracle-box/flint/schema';
import { defineCollection } from 'astro:content';

const docs = defineCollection({
	type: 'content',
	schema: docsSchema,
});

export const collections = {
	docs,
};
