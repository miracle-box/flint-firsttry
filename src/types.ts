import type { Locales } from './i18n/i18n-types';
import type { MarkdownHeading, MarkdownInstance } from 'astro';
import type { ComponentProps, JSX } from 'solid-js';

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
	Content: MarkdownInstance<Record<string, unknown>>['Content'];
	title: string;
	desc: string;
	author: string;
	image: string;
	date: string;
};

export type NewsPageProps = {
	contentProps: News;
};

export type Docs = {
	id: string;
	slug: string;
	locale: Locales;
	// Actually, the real type of property `content` is `AstroComponentFactory`
	Content: MarkdownInstance<Record<string, unknown>>['Content'];
	headings: MarkdownHeading[];
	title: string;
	desc: string;
	outdated: boolean;
};

export type DocsPageProps = {
	contentProps: Docs;
	pageProps: {
		fallback: boolean;
	};
};

export type TocItem = MarkdownHeading & {
	children: TocItem[];
};

export type Icon = (props: ComponentProps<'svg'>) => JSX.Element;
