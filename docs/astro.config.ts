import type { RawFlintConfig } from '@miracle-box/flint/utils';
import flint from '@miracle-box/flint';
import { defineConfig } from 'astro/config';

const flintConfig: RawFlintConfig = {
	locales: {
		zh: {
			label: '中文',
		},
		en: {
			label: 'English',
		},
	},
	defaultLocale: 'zh',
	flintTranslationsPath: './src/i18n/index',
	redirects: {
		'/': {
			destination: '/zh/',
			status: 302,
		},
	},
	legacy: {
		logoImg: '/favicon.svg',
		icpRecordText: '吉 ICP 备 2021002465 号',
		icpRecordLink: 'https://beian.miit.gov.cn/',
		secRecordText: '吉公网安备 22017202000263 号',
		secRecordLink: 'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=22017202000263',
	},
};

export default defineConfig({
	integrations: [flint(flintConfig)],
});
