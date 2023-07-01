import type { Translation } from '../i18n-types';

const en: Translation = {
	site: {
		logotype: 'Losenone',
		logoAlt: 'Logo',
		title: 'Losenone',
	},
	navItems: {
		news: 'News',
		docs: 'Docs',
		resources: 'Resolution',
		guiluo: 'GuiLuoYuan',
	},
	hero: {
		title: 'Losenone',
		desc: 'Amazing description here.',
		primaryButton: 'Primary',
		secondaryButton: 'Secondary',
	},
	notfound: {
		title: 'missing',
		body: "Sorry, but the page you requested isn't here!",
		button: 'Return',
	},
	docs: {
		breadcrumbBase: 'Docs',
		fallbackTip:
			'Requested page is not yet translated to the selected language ({0|localeName}), showing {1|localeName} version.',
		outdatedTranslationTip: [
			'This page contains an outdated translation of the original content. Please check the',
			' {0|localeName} version ',
			'for the most accurate information. ',
			'(and consider updating the translation if you are able to help out!)',
		],
		tocHeading: 'On this page',
	},
};

export default en;
