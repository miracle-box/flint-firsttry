import type { MarkdownInstance } from 'astro';
import { z } from 'astro/zod';

export const newsSchema = z.object({
	title: z.string(),
	desc: z.string(),
	author: z.string(),
	image: z.string().url(),
	date: z.string().datetime({ offset: true, precision: 0 }),
	tags: z.string().array().nonempty(),
});

export type News = {
	id: string;
	slug: string;
	// Actually, the real type of property `content` is `AstroComponentFactory`
	Content: MarkdownInstance<Record<string, unknown>>['Content'];
	title: string;
	desc: string;
	author: string;
	image: string;
	date: Date;
	tags: string[];
};
