import type { Locales } from './i18n/i18n-types';
import type { MarkdownHeading, MarkdownInstance } from 'astro';
import type { ComponentProps, JSX } from 'solid-js';
import type { siteConfig } from '~/config';

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
	news: {
		tags: Record<string, { name: string; desc: string }>;
	};
};

export type NewsTag = keyof typeof siteConfig.news.tags;
export type NewsTags = [NewsTag, ...NewsTag[]];

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
	tags: NewsTags;
};

export type NewsPageProps = {
	contentProps: News;
	pageProps: {
		nextPost: News | undefined;
		prevPost: News | undefined;
	};
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
	outdated_translation: string | false;
};

export type DocsPageProps = {
	contentProps: Docs;
	pageProps: {
		fallback: boolean;
		outdated: boolean;
	};
};

export type TocItem = MarkdownHeading & {
	children: TocItem[];
};

export type Icon = (props: ComponentProps<'svg'>) => JSX.Element;
