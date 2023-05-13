import type { MarkdownHeading } from 'astro';
import type { TocItem } from '~/types';

/**
 * Get TOC tree from flat headings array. (H2/H3 only)
 * @param headings Headings array from rendered document
 * @returns TOC tree
 */
export function getTocTree(headings: MarkdownHeading[]): TocItem[] {
	const tree: TocItem[] = [];

	// We only need H2 and H3 headings
	headings = headings.filter(({ depth }) => depth === 2 || depth === 3);

	// Ensure the first heading is H2
	if (headings.length > 0 && headings[0]!.depth !== 2)
		throw new Error(`Unexpected heading: ${headings[0]!.text} should be H2.`);

	for (const item of headings) {
		const lastTocItem = tree[tree.length - 1];
		if (item.depth === 2) tree.push({ ...item, children: [] });
		else if (item.depth === 3) lastTocItem?.children.push({ ...item, children: [] });
	}

	return tree;
}
