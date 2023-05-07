import type { Locales, SiteConfig } from './types';

function defineConfig<T extends SiteConfig>(input: T) {
	return input;
}

export const siteConfig = defineConfig({
	site: {
		defaultLocale: 'zh',
		logoImg: '/favicon.svg',
		icpRecordText: '吉 ICP 备 2021002465 号',
		icpRecordLink: 'https://beian.miit.gov.cn/',
		secRecordText: '吉公网安备 22017202000263 号',
		secRecordLink: 'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=22017202000263',
	},
});

export const localeNames: Record<Locales, string> = {
	zh: '中文',
	en: 'English',
};
