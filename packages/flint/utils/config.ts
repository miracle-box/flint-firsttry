import { z } from 'astro/zod';

const LocaleSchema = z.object({
	label: z.string(),
	locale: z.string().optional(),
	dir: z.enum(['rtl', 'ltr']).default('ltr').optional(),
});

const NewsTagSchema = z.object({
	name: z.string(),
	desc: z.string(),
});

export type NewsTag = z.infer<typeof NewsTagSchema>;

const ModuleRouteCommonSchema = z.object({
	collectionId: z.string(),
	// Allow numbers, alphabets, hyphens and underscores for module name
	// Module names are also used for base path in routing
	routeBasePath: z.string().regex(/^[\w-]+$/),
});

const ModuleRouteDocsSchema = ModuleRouteCommonSchema.extend({
	type: z.literal('docs'),
});

const ModuleRouteNewsSchema = ModuleRouteCommonSchema.extend({
	type: z.literal('news'),
	tags: z.record(z.string(), NewsTagSchema),
});

const ModuleRouteSchema = z.union([ModuleRouteDocsSchema, ModuleRouteNewsSchema]);

export type ModuleRoute = z.infer<typeof ModuleRouteSchema>;

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
	flintTranslationsPath: z.string(),
	// This is just a workaround, will support multi-instance in the future.
	modules: z.object({
		news: ModuleRouteNewsSchema,
		docs: ModuleRouteDocsSchema,
	}),
	legacy: z.object({
		logoImg: z.string(),
		icpRecordText: z.string(),
		icpRecordLink: z.string().url(),
		secRecordText: z.string(),
		secRecordLink: z.string().url(),
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
