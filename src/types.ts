import type { MarkdownHeading } from 'astro';
import type { siteConfig } from '@config';
import type { Locales } from './i18n/i18n-types';

export type { Locales, Translations } from './i18n/i18n-types';

export type NavbarTranslation = Record<keyof typeof siteConfig.navbar, string>;

export type SiteConfig = {
	defaultLocale: Locales;
	hero: Record<'bgImage' | 'mainImage' | 'primaryLink' | 'secondaryLink', string>;
	navbar: Record<string, string>;
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
