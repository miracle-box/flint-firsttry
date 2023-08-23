declare module 'virtual:flint/config' {
	const Config: import('./types').FlintConfig;
	export default Config;
}

declare module 'virtual:flint/extended-translation' {
	const ExtendedTranslations: Record<string, import('./schema').FlintTranslationExtend>;
	export default ExtendedTranslations;
}
