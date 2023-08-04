import type { FlintTranslation } from '../schema';
import { t } from '../schema';
import { localeLabel } from '../translation-utils';

const en: FlintTranslation = {
	site: {
		logotype: t`Losenone`,
		logoAlt: t`Logo`,
		title: t`Losenone`,
	},
	navItems: {
		news: t`News`,
		docs: t`Docs`,
		resources: t`Resolution`,
		guiluo: t`GuiLuoYuan`,
	},
	hero: {
		title: t`Losenone`,
		desc: t`Amazing description here.`,
		primaryButton: t`Primary`,
		secondaryButton: t`Secondary`,
	},
	notfound: {
		title: t`missing`,
		body: () => "Sorry, but the page you requested isn't here!",
		button: t`Return`,
	},
	docs: {
		breadcrumbBase: t`Docs`,
		fallbackTip: (source: string, actual: string) =>
			'Requested page is not yet translated to the selected language ' +
			`(${localeLabel(source)}), showing ${localeLabel(actual)} version.`,
		outdatedTip: t`The content on this page is incomplete or outdated. If you are able to help out, please consider updating the article!`,
		outdatedTranslationTip: [
			t`This page contains an outdated translation of the original content. Please check the `,
			(source: string) => `${localeLabel(source)} version`,
			t`for the most accurate information. `,
			t`(and consider updating the translation if you are able to help out!)`,
		],
		tocHeading: t`On this page`,
	},
	news: {
		breadcrumbBase: t`News`,
	},
};

export default en;
