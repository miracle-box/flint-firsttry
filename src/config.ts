import type { SiteConfig } from './types';

function defineConfig<T extends SiteConfig>(input: T) {
	return input;
}

export const siteConfig = defineConfig({
	site: {
		defaultLocale: 'zh',
		logoImg: '/favicon.svg',
	},
	hero: {
		bgImage: 'http://api.muvip.cn/api/bing',
		mainImage: 'https://dummyimage.com/512x512',
		primaryLink: './docs',
		secondaryLink: './news',
	},
	navbarLinks: {
		show: '#',
		doc: '#',
		res: '#',
		guiluo: 'https://spark.yaasasi.cn/',
	},
});
