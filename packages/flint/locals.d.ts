/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/consistent-type-imports */

declare namespace App {
	export interface Locals {
		locale: string;
		translations: import('./i18n/schema').FlintTranslation;
		customTranslations: import('./i18n/schema').CustomTranslation;
	}
}
