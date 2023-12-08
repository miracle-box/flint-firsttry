import type { MarkdownHeading, MarkdownInstance } from 'astro';
import { z } from 'astro/zod';

export const docsSchema = () =>
	z.object({
		title: z.string(),
		desc: z.string(),
		outdated: z.boolean().default(false).optional(),
		outdated_translation: z.union([z.string().url(), z.literal(false)]).optional(),
	});

export type Docs = {
	id: string;
	slug: string;
	locale: string;
	// Actually, the real type of property `content` is `AstroComponentFactory`
	Content: MarkdownInstance<Record<string, unknown>>['Content'];
	headings: MarkdownHeading[];
	title: string;
	desc: string;
	outdated: boolean;
	outdated_translation: string | false;
};
