import Config from 'virtual:flint/config';

export function replacePrarms(string: string, ...parameters: string[]): string {
	let replacedString = string;

	for (const [index, parameter] of parameters.entries()) {
		replacedString = replacedString.replaceAll(`{${index}}`, parameter);
	}

	return replacedString;
}

export function localeLabel(locale: string): string {
	return Config.locales[locale]!.label;
}
