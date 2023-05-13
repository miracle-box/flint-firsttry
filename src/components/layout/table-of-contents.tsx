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
							onClick={(event) => {
								event.preventDefault();
								document.querySelector(`#${slug}`)?.scrollIntoView({ behavior: 'smooth' });
							}}
							class="leading-7"
							classList={{ 'text-primary-600': props.activeId === slug }}
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

function getSlugsFromToc(tree: TocItem[]) {
	const slugs: string[] = [];
	for (const { slug, children } of tree) slugs.push(slug, ...getSlugsFromToc(children));
	return slugs;
}

export const TableOfContents: Component<TocProps> = (props: TocProps) => {
	const [activeId, setActiveId] = createSignal('');
	const [activeIndex, setActiveIndex] = createSignal(0);

	createEffect(() => {
		const slugs = getSlugsFromToc(props.tocTree);
		const headings = document.querySelectorAll('h2, h3');

		function handleObserver(entries: IntersectionObserverEntry[]) {
			for (const element of entries) {
				console.count('Intersection Callback');
				if (element.isIntersecting) {
					setActiveId(element.target.id);
					setActiveIndex(slugs.indexOf(element.target.id));
					console.log(element.target.id);
					break;
				}
			}
		}

		const observer = new IntersectionObserver(handleObserver);
		for (const element of headings) observer.observe(element);
	});

	const Marker = (
		<div
			class="absolute mt-1 transition ml-1 bg-primary-500 w-1 h-5 rounded"
			// Currently, the height of each entry in TOC is 28px.
			style={{ transform: `translateY(calc(${activeIndex()} * 28px))` }}
		/>
	);

	return (
		<>
			{Marker}
			<TableOfContentsItem tocTree={props.tocTree} activeId={activeId()} />
		</>
	);
};
