import { type Component, For, Show, createSignal, createEffect } from 'solid-js';
import type { TocItem } from '~/types';

type TocProps = {
	tocTree: TocItem[];
};

type TocItemProps = TocProps & {
	activeId: string;
};

const TableOfContentsItem: Component<TocItemProps> = (props: TocItemProps) => {
	return (
		<For each={props.tocTree}>
			{({ slug, text, children }) => (
				<ul class="ml-4">
					<li class="w-full text-ellipsis overflow-hidden break-all whitespace-nowrap text-md">
						<a
							href={`#${slug}`}
							class="leading-7"
							classList={{ 'text-primary-600': props.activeId === slug }}
							onClick={(event) => {
								event.preventDefault();
								document.querySelector(`#${slug}`)?.scrollIntoView({ behavior: 'smooth' });
							}}
						>
							{text}
						</a>
					</li>
					<Show when={children.length > 0}>
						<li>
							<TableOfContentsItem tocTree={children} activeId={props.activeId} />
						</li>
					</Show>
				</ul>
			)}
		</For>
	);
};

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

		const observer = new IntersectionObserver(handleObserver);
		// Only H2 and H3 headings are included in the TOC.
		for (const element of document.querySelectorAll('h2, h3')) observer.observe(element);
	});

	const marker = (
		<div
			class="absolute mt-1 transition ml-1 bg-primary-500 w-1 h-5 rounded"
			// Currently, the height of each entry in TOC is 28px.
			style={{ transform: `translateY(${activeIndex() * 28}px)` }}
		/>
	);

	return (
		<>
			{marker}
			<TableOfContentsItem tocTree={props.tocTree} activeId={activeId()} />
		</>
	);
};
