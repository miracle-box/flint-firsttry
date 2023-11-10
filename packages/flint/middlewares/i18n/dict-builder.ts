import type { CustomTranslation, FlintTranslation } from '../../i18n/schema';
import extend from 'just-extend';
import Config from 'virtual:flint/config';
import { customSchema, customDict, flintUserDict } from 'virtual:flint/user-translation';
import { FlintTranslationSchema, flintDict } from '../../i18n';

export class FlintDict {
	private defaults: FlintTranslation;
	private readonly store: Record<string, FlintTranslation>;

	constructor() {
		this.defaults = this.buildDefaults();
		this.store = {};

		for (const locale of Object.keys(Config.locales)) {
			this.store[locale] = this.buildDict(locale);
		}
	}

	public useTranslation(locale: string): FlintTranslation {
		if (import.meta.env.DEV) {
			this.defaults = this.buildDefaults();
			return this.buildDict(locale);
		}

		return this.store[locale]!;
	}

	private buildDefaults(): FlintTranslation {
		return this.parseDict(
			extend(
				true,
				{},
				flintDict.en,
				flintDict[Config.defaultLocale],
				flintUserDict[Config.defaultLocale],
			) as FlintTranslation,
		);
	}

	private parseDict(dict: FlintTranslation) {
		return FlintTranslationSchema.parse(dict);
	}

	private buildDict(locale: string): FlintTranslation {
		return this.parseDict(
			extend(true, {}, this.defaults, flintDict[locale], flintUserDict[locale]) as FlintTranslation,
		);
	}
}

export class CustomDict {
	private defaults: CustomTranslation;
	private readonly store: Record<string, CustomTranslation>;

	constructor() {
		this.defaults = this.buildDefaults();
		this.store = {};

		for (const locale of Object.keys(Config.locales)) {
			this.store[locale] = this.buildDict(locale);
		}
	}

	public useTranslation(locale: string): CustomTranslation {
		if (import.meta.env.DEV) {
			this.defaults = this.buildDefaults();
			return this.buildDict(locale);
		}

		return this.store[locale]!;
	}

	private buildDefaults(): CustomTranslation {
		return this.parseDict(extend(true, {}, customDict[Config.defaultLocale]));
	}

	private parseDict(dict: CustomTranslation) {
		return customSchema.parse(dict);
	}

	private buildDict(locale: string): CustomTranslation {
		return this.parseDict(extend(true, {}, this.defaults, customDict[locale]));
	}
}
