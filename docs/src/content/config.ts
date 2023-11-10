import { docsSchema } from '@miracle-box/flint/schemas';
import { defineCollection } from 'astro:content';

const docs = defineCollection({
	type: 'content',
	schema: docsSchema,
});

export const collections = {
	docs,
};
