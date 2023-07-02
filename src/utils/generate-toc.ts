import type { MarkdownHeading } from 'astro';
import type { TocItem } from '~/types';

/**
 * Limit the depth of TocTree
 * @param tree TOC tree
 * @param level maximum nesting level
 */
function limitTreeNesting(tree: TocItem[], level: number): TocItem[] {
	if (level === 1) for (const item of tree) item.children = [];
	else if (level > 1) for (const item of tree) item.children = limitTreeNesting(item.children, level - 1);

	return tree;
}

/**
 * Get TOC tree from flat headings array. (H2/H3 only)
 * @param headings Headings array from rendered document
 * @returns TOC tree
 */
export function getTocTree(headings: MarkdownHeading[]): TocItem[] {
	const stack: TocItem[] = [];
	const root: TocItem[] = [];

	for (const heading of headings) {
		const node: TocItem = { ...heading, children: [] };

		while (stack.length > 0 && stack[stack.length - 1]!.depth >= heading.depth) stack.pop();

		if (stack.length > 0) stack[stack.length - 1]!.children.push(node);
		else root.push(node);

		stack.push(node);
	}

	return limitTreeNesting(root, 2);
}
