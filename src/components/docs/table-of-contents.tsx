import { type Component, For, Show, createSignal, createEffect } from 'solid-js';
import type { TocItem } from '~/types';

type TocProps = {
	tocTree: TocItem[];
};

type TocItemProps = TocProps & {
	activeId: string;
};

const TableOfContentsItem: Component<TocItemProps> = (props: TocItemProps) => (
	<ul class="ml-4">
		<For each={props.tocTree}>
			{({ slug, text, children }) => (
				<li class="w-full text-ellipsis overflow-hidden break-all whitespace-nowrap text-md">
					<a href={`#${slug}`} class="leading-7" classList={{ 'text-primary-600': props.activeId === slug }}>
						{text}
					</a>
					<Show when={children.length > 0}>
						<TableOfContentsItem tocTree={children} activeId={props.activeId} />
					</Show>
				</li>
			)}
		</For>
	</ul>
);

/**
 * Get an array of slugs from the TOC tree.
 * @param tree TOC tree
 * @returns Array of slugs of headings on the page
 */
function getSlugsFromToc(tree: TocItem[]): string[] {
	const slugs: string[] = [];
	for (const { slug, children } of tree) slugs.push(slug, ...getSlugsFromToc(children));
	return slugs;
}

export const TableOfContents: Component<TocProps> = (props: TocProps) => {
	const [activeId, setActiveId] = createSignal('');
	const [activeIndex, setActiveIndex] = createSignal(0);

	createEffect(() => {
		const slugs = getSlugsFromToc(props.tocTree);
		const visibleHeadingSlugs = new Set<string>();

		function handleObserver(entries: IntersectionObserverEntry[]) {
			// Maintain a list of currently visible headings.
			for (const element of entries) {
				if (element.isIntersecting) visibleHeadingSlugs.add(element.target.id);
				else visibleHeadingSlugs.delete(element.target.id);
			}

			// Find the first heading that is visible on the page.
			for (const [index, slug] of slugs.entries()) {
				if (visibleHeadingSlugs.has(slug)) {
					setActiveId(slug);
					setActiveIndex(index);
					break;
				}
			}
		}

		// Top margin = -1 * (height of navbar + 1px).
		// NOTE: change this value after changing navbar height
		const observer = new IntersectionObserver(handleObserver, { rootMargin: '-65px 0px 0px 0px' });
		// Only H2 and H3 headings are included in the TOC.
		for (const element of document.querySelectorAll('h2, h3')) observer.observe(element);
	});

	const marker = (
		<div
			class="absolute transition"
			// Currently, the height of each entry in TOC is 28px.
			style={{ transform: `translateY(${activeIndex() * 28}px)` }}
		>
			<div class="absolute bg-primary-500 mt-[4px] h-5 w-[4px] rounded" />
			<div class="absolute bg-primary-500/10 mt-[0px] h-[28px] w-[230px] ml-2 rounded-md" />
		</div>
	);

	return (
		<>
			{marker}
			<TableOfContentsItem tocTree={props.tocTree} activeId={activeId()} />
		</>
	);
};
