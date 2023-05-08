import type { MarkdownHeading, MarkdownInstance } from 'astro';
import type { Locales } from './i18n/i18n-types';

export type { Locales, Translations } from './i18n/i18n-types';

export type SiteConfig = {
	site: {
		defaultLocale: Locales;
		logoImg: string;
		icpRecordText: string;
		icpRecordLink: string;
		secRecordText: string;
		secRecordLink: string;
	};
};

export type News = {
	id: string;
	slug: string;
	// Actually, the real type of property `content` is `AstroComponentFactory`
	content: MarkdownInstance<Record<string, unknown>>['Content'];
	title: string;
	desc: string;
	author: string;
	image: string;
	date: string;
};

export type Docs = {
	id: string;
	slug: string;
	// Actually, the real type of property `content` is `AstroComponentFactory`
	content: MarkdownInstance<Record<string, unknown>>['Content'];
	headings: MarkdownHeading[];
	title: string;
	desc: string;
	outdated: boolean;
};
