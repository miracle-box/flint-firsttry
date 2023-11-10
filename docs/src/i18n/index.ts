import type { FlintUserDictionary } from '@miracle-box/flint/i18n';
import { t, tSchema } from '@miracle-box/flint/i18n';
import { z } from 'astro/zod';

export const flintUserDict: FlintUserDictionary = {};

export const customSchema = z.object({
	hero: z.object({
		title: tSchema(),
		desc: tSchema(),
		primaryButton: tSchema(),
		secondaryButton: tSchema(),
	}),
});
export type CustomTranslation = z.infer<typeof customSchema>;

export const customDict: Record<string, z.infer<typeof customSchema>> = {
	en: {
		hero: {
			title: t`Flint`,
			desc: t`A lightweight Astro theme for documentation sites`,
			primaryButton: t`Get started`,
			secondaryButton: t`Read the docs`,
		},
	},
	zh: {
		hero: {
			title: t`Flint`,
			desc: t`一个轻量的 Astro 主题，为文档站点打造`,
			primaryButton: t`快速开始`,
			secondaryButton: t`阅读文档`,
		},
	},
};
