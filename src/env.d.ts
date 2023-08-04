/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'virtual:flint/config' {
	import type { FlintConfig } from '~/types';

	const Config: FlintConfig;
	export default Config;
}

declare module 'virtual:flint/extended-translation' {
	import type { FlintTranslationExtend } from '~/i18n/schema';

	const ExtendedTranslations: Record<string, FlintTranslationExtend>;
	export default ExtendedTranslations;
}
