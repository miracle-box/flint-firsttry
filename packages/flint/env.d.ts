/// <reference path="../../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="./types" />

import type { FlintTranslationExtend } from './i18n/schema';
import type { FlintConfig } from './types';

declare module 'virtual:flint/config' {
	const Config: FlintConfig;
	export default Config;
}

declare module 'virtual:flint/extended-translation' {
	const ExtendedTranslations: Record<string, FlintTranslationExtend>;
	export default ExtendedTranslations;
}
