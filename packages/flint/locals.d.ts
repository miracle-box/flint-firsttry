/* eslint-disable @typescript-eslint/consistent-type-imports */

declare namespace App {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Locals {
		locale: string;
		translations: import('./schemas/i18n').FlintTranslation;
	}
}
