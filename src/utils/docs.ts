import type { CollectionEntry } from 'astro:content';
import type { Locales, Docs } from '~/types';
import { getCollection } from 'astro:content';
import { isValidLocale } from '~/utils/i18n';
import { siteConfig } from '~/config';

/**
 * Remove the tailing country code (i.e. /something/nested[/zh]) from a slug
 * @param ogSlug slug generated by Astro
 */
function getSlug(ogSlug: string) {
	return ogSlug.split('/').slice(0, -1).join('/');
}

function getLocaleFromSlug(slug: string): Locales {
	const splitted = slug.split('/').reverse();

	// Type guard here, throws an error when the locale is not valid.
	if (isValidLocale(splitted[0]!)) return splitted[0];

	throw new Error(`Unexpected locale found in docs:${slug}`);
}

async function getNormalizedPage(page: CollectionEntry<'docs'>): Promise<Docs> {
	const { id, slug, data } = page;
	const { title, desc, outdated = false, outdated_translation = false } = data;
	const { Content, headings } = await page.render();
	const locale = getLocaleFromSlug(slug);

	return {
		id,
		slug: getSlug(slug),
		locale,
		Content,
		headings,
		title,
		desc,
		outdated,
		outdated_translation,
	};
}

async function load(): Promise<Docs[]> {
	const allDocs = await getCollection('docs');
	const renderedDocs = allDocs.map(async (page) => getNormalizedPage(page));
	return Promise.all(renderedDocs);
}

let _pages: Docs[];
export async function fetchDocs(): Promise<Docs[]> {
	if (!_pages) _pages = await load();
	return _pages;
}

export async function getLocalDocs(locale: Locales): Promise<Docs[]> {
	const pages = await fetchDocs();
	return pages.filter((p) => p.locale === locale);
}

export async function getFallbackBySlugs(slugs: string[]): Promise<Docs[]> {
	const defaultPages = await getLocalDocs(siteConfig.site.defaultLocale);

	// Filter by slugs
	const filteredPages = defaultPages.filter((p) => !slugs.includes(p.slug));

	return filteredPages;
}
