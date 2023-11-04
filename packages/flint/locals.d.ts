/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/consistent-type-imports */

declare namespace App {
	export interface Locals {
		locale: string;
		translations: import('./schemas/i18n').FlintTranslation;
		customTranslations: import('./schemas/i18n').CustomTranslation;
	}
}
