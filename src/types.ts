import type { MarkdownHeading } from 'astro';
import type { siteConfig } from '@config';
import type { Locales } from './i18n/i18n-types';

export type { Locales, Translations } from './i18n/i18n-types';

export type NavbarTranslation = {
	links: Record<keyof typeof siteConfig.navbar.links, string>;
	icons: Record<keyof typeof siteConfig.navbar.icons, string>;
};

export type SiteConfig = {
	defaultLocale: Locales;
	navbar: {
		links: Record<string, string>;
		icons: Record<string, { icon: string; link: string }>;
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
