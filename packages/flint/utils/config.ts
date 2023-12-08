import { z } from 'astro/zod';

const LocaleSchema = z.object({
	label: z.string(),
	locale: z.string().optional(),
	dir: z.enum(['rtl', 'ltr']).default('ltr').optional(),
});

const RawFlintConfigSchema = z.object({
	locales: z.record(z.string(), LocaleSchema).transform((locales) => {
		// Fill `locale` field with key name when not specified
		for (const [key, localeConfig] of Object.entries(locales)) {
			const realLocale = localeConfig.locale ?? key;
			localeConfig.locale = realLocale;
		}

		return locales;
	}),
	defaultLocale: z.string(),
	// Taken from AstroConfigSchema: https://github.com/withastro/astro/blob/ab7e745cc9abd592aa631bffb35880221e7ac89c/packages/astro/src/core/config/schema.ts#L174
	redirects: z
		.record(
			z.string(),
			z.union([
				z.string(),
				z.object({
					status: z.union([
						z.literal(300),
						z.literal(301),
						z.literal(302),
						z.literal(303),
						z.literal(304),
						z.literal(307),
						z.literal(308),
					]),
					destination: z.string(),
				}),
			]),
		)
		.default({}),
	legacy: z.object({
		logoImg: z.string(),
	}),
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
			locales,
			defaultLocale,
			...config,
		} as const;
	},
);

export type RawFlintConfig = z.input<typeof FlintConfigSchema>;
export type FlintConfig = z.infer<typeof FlintConfigSchema>;
