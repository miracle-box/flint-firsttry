/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module 'virtual:flint/config' {
	const Config: import('./types').FlintConfig;
	export default Config;
}

declare module 'virtual:flint/extended-translation' {
	const ExtendedTranslations: Record<string, import('./i18n-utils').FlintExtendedDictionary>;
	export default ExtendedTranslations;
}
