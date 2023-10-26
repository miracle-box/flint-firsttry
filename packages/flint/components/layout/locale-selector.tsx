import type { Component } from 'solid-js';
import { For } from 'solid-js';
import S from '../../styles/components/locale-selector.module.css';
import DownIcon from '~icons/octicon/chevron-down-16';
import LanguageIcon from '~icons/octicon/globe-24';

export type LocaleItem = {
	label: string;
	link: string;
};

type Props = {
	locales: Record<string, LocaleItem>;
	currentLocale: string;
};

export const LocaleSelector: Component<Props> = (props: Props) => {
	const selector = (
		<select
			class={S.__selector}
			onChange={(event) => {
				const newLocale = event.currentTarget.value;
				window.location.pathname = props.locales[newLocale]!.link;
			}}
		>
			<For each={Object.entries(props.locales)}>
				{(i) => (
					<option value={i[0]} selected={i[0] === props.currentLocale}>
						{i[1].label}
					</option>
				)}
			</For>
		</select>
	);
	return (
		<label class={S['locale-selector']}>
			<LanguageIcon class={S.__icon} />
			{selector}
			<DownIcon class={S.__down} />
		</label>
	);
};
