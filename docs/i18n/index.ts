import type { FlintUserDictionary } from '@miracle-box/flint/i18n-utils';
import { t, tSchema } from '@miracle-box/flint/i18n-utils';
import { z } from 'astro/zod';

export const flintUserDict: FlintUserDictionary = {
	zh: {},
};

export const customSchema = z.object({
	hero: tSchema(),
});

export const customDict = {
	zh: {
		hero: t``,
	},
};
