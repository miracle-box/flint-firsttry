import Config from 'virtual:flint/config';

export function localeLabel(locale: string): string {
	return Config.locales[locale]!.label;
}
