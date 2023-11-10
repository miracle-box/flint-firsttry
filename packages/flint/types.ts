import type { Docs } from './schemas/docs';
import type { MarkdownHeading } from 'astro';
import type { ComponentProps, JSX } from 'solid-js';

export type { RawFlintConfig, FlintConfig } from './utils/config';

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
