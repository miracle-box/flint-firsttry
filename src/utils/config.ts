import { z } from 'astro/zod';

const LocaleSchema = z.object({
	label: z.string(),
	locale: z.string().optional(),
	dir: z.enum(['rtl', 'ltr']).default('ltr').optional(),
});

const NewsTagsSchema = z.object({
	name: z.string(),
	desc: z.string(),
});

const ModuleRouteSchema = z.intersection(
	z.object({
		contentId: z.string(),
	}),
	z.union([
		// Schema for docs
		z.object({
			type: z.literal('docs'),
		}),
		// Schema for news
		z.object({
			type: z.literal('news'),
			tags: z.record(z.string(), NewsTagsSchema),
		}),
	]),
);

const RawFlintConfigSchema = z.object({
	locales: z.record(z.string(), LocaleSchema).transform((locales) => {
		// Fill the `locale` field with key name when not specified
		for (const [key, localeConfig] of Object.entries(locales)) {
			const realLocale = localeConfig.locale ?? key;
			localeConfig.locale = realLocale;
		}

		return locales;
	}),
	defaultLocale: z.string(),
	// Allow numbers, alphabets, hyphens and underscores for module name
	// Module names are also used for base path in routing
	modules: z.record(z.string().regex(/^[\w-]+$/), ModuleRouteSchema),
});

export const FlintConfigSchema = RawFlintConfigSchema.strict().transform(
	({ locales, defaultLocale, ...config }, ctx) => {
		// Ensure default locale is configured in `locales`
		if (!(defaultLocale in locales)) {
			ctx.addIssue({
				code: 'custom',
				message: "Can't find your default locale in `locales`, please make sure it was defined in `locales`.",
			});
			return z.NEVER;
		}

		return {
			...config,
		} as const;
	},
);

export type RawFlintConfig = z.input<typeof FlintConfigSchema>;
export type FlintConfig = z.infer<typeof FlintConfigSchema>;
