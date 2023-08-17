import { z } from 'astro/zod';
import Config from 'virtual:flint/config';

export function tSchema() {
	return z.function().returns(z.string());
}

export function t(text: TemplateStringsArray) {
	const tFunc = () => text.join('');
	return tFunc;
}

export function localeLabel(locale: string): string {
	return Config.locales[locale]!.label;
}
