import type { MarkdownInstance } from 'astro';

type GroupedMarkdownPages = Partial<Record<string, MarkdownPage[]>>;
type MarkdownPage = MarkdownInstance<Record<string, unknown>>;

/**
 * Group pages by the first subdir (i.e. locale dir)
 * @param pages pages fetched by invoking `Astro.glob()`
 * @returns grouped pages
 */
export const groupPages = (pages: MarkdownPage[]) => {
	const groupedPages: GroupedMarkdownPages = {};
	for (const page of pages) {
		const subdir = page.url!.split('/')[1]!;

		if (!groupedPages[subdir]) groupedPages[subdir] = [];
		groupedPages[subdir]!.push(page);
	}

	return groupedPages;
};
