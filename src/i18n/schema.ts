import { z } from 'astro/zod';

function tFunc() {
	return z.function().returns(z.string());
}

export const FlintTranslationSchema = z.object({
	site: z.object({
		logotype: tFunc(),
		logoAlt: tFunc(),
		title: tFunc(),
	}),
	navItems: z.object({
		news: tFunc(),
		docs: tFunc(),
		resources: tFunc(),
		guiluo: tFunc(),
	}),
	hero: z.object({
		title: tFunc(),
		desc: tFunc(),
		primaryButton: tFunc(),
		secondaryButton: tFunc(),
	}),
	notfound: z.object({
		title: tFunc(),
		body: tFunc(),
		button: tFunc(),
	}),
	docs: z.object({
		breadcrumbBase: tFunc(),
		fallbackTip: tFunc().args(z.string(), z.string()),
		outdatedTip: tFunc(),
		outdatedTranslationTip: z.tuple([tFunc(), tFunc().args(z.string()), tFunc(), tFunc()]),
		tocHeading: tFunc(),
	}),
	news: z.object({
		breadcrumbBase: tFunc(),
	}),
});

export const FlintTranslationExtendSchema = FlintTranslationSchema.deepPartial();

export function t(text: TemplateStringsArray) {
	const tFunc = () => text.join('');
	return tFunc;
}

export type FlintTranslation = z.infer<typeof FlintTranslationSchema>;
export type FlintTranslationExtend = z.infer<typeof FlintTranslationExtendSchema>;
