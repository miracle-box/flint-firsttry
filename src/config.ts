import type { SiteConfig } from './types';

function defineConfig<T extends SiteConfig>(input: T) {
	return input;
}

export const siteConfig = defineConfig({
	defaultLocale: 'zh',
	navbar: {
		links: {
			show: '#',
			doc: '#',
			res: '#',
			guiluo: 'https://spark.yaasasi.cn/',
		},
		icons: {
			github: {
				icon: 'bi:github',
				link: 'https://github.com/',
			},
		},
	},
});
