import { z } from 'astro/zod';

function tFunc() {
	return z.function().returns(z.string());
}

export const BuiltinDictSchema = z.object({
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

export function t(text: string) {
	const tFunc = () => text;
	return tFunc;
}

export type BuiltinDict = z.infer<typeof BuiltinDictSchema>;
