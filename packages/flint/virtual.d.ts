/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module 'virtual:flint/config' {
	const Config: import('./types').FlintConfig;
	export default Config;
}

declare module 'virtual:flint/user-translation' {
	export const customSchema: import('astro/zod').AnyZodObject;
	export const flintUserDict: Record<string, import('./i18n-utils').FlintUserDictionary>;
}
