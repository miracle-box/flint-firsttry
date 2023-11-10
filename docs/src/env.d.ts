/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare namespace App {
	import { Locals } from '@miracle-box/flint/locals';

	interface Locals {
		customTranslations: import('./i18n').CustomTranslation;
	}
}
