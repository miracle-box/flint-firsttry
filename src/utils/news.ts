import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { News } from 'src/types';

async function getNormalizedPage(page: CollectionEntry<'news'>): Promise<News> {
	const { id, slug, data } = page;
	const { title, desc, author, image, date } = data;
	const rendered = await page.render();

	return {
		id,
		slug,
		content: rendered.Content,
		title,
		desc,
		author,
		image,
		date,
	};
}

async function load(): Promise<News[]> {
	const allNews = await getCollection('news');
	const renderedNews = allNews.map(async (page) => getNormalizedPage(page));
	return Promise.all(renderedNews);
}

let _pages: News[];
export async function fetchNews(): Promise<News[]> {
	if (!_pages) _pages = await load();
	return _pages;
}

export async function groupNewsByYear(): Promise<Record<number, News[]>> {
	const pages = await fetchNews();
	const pagesByYear: Record<number, News[]> = {};
	for (const p of pages) {
		const year = new Date(p.date).getFullYear();
		if (!pagesByYear[year]) pagesByYear[year] = [];
		pagesByYear[year]?.push(p);
	}

	return pagesByYear;
}
