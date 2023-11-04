import type { FlintUserDictionary } from '@miracle-box/flint/i18n-utils';
import { t, tSchema } from '@miracle-box/flint/i18n-utils';
import { z } from 'astro/zod';

export const flintUserDict: FlintUserDictionary = {};

export const customSchema = z.object({});
export type CustomTranslation = z.infer<typeof customSchema>;

export const customDict: Record<string, z.infer<typeof customSchema>> = {};
