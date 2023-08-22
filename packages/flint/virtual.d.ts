import type { FlintTranslationExtend } from './schemas/i18n';
import type { FlintConfig } from './types';

declare module 'virtual:flint/config' {
	const Config: FlintConfig;
	export default Config;
}

declare module 'virtual:flint/extended-translation' {
	const ExtendedTranslations: Record<string, FlintTranslationExtend>;
	export default ExtendedTranslations;
}
