/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'virtual:flint/config' {
	import type { FlintConfig } from './types';

	const Config: FlintConfig;
	export default Config;
}
