import type { MarkdownHeading } from 'astro';
import type { Locales } from './i18n/i18n-types';

export type { Locales, Translations } from './i18n/i18n-types';

export type SiteConfig = {
	site: {
		defaultLocale: Locales;
		logoImg: string;
	};
	hero: {
		bgImage: string;
		mainImage: string;
		primaryLink: string;
		secondaryLink: string;
	};
};

export type News = {
	id: string;
	slug: string;
	content: unknown;
	title: string;
	desc: string;
	author: string;
	image: string;
	date: string;
};

export type Docs = {
	id: string;
	slug: string;
	content: unknown;
	headings: MarkdownHeading[];
	title: string;
	desc: string;
	outdated: boolean;
};
