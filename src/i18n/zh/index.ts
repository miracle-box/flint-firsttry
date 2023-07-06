import type { BaseTranslation } from '../i18n-types';

const zh: BaseTranslation = {
	site: {
		logotype: '洛书南',
		logoAlt: '图标',
		title: '洛书南',
	},
	navItems: {
		news: '新闻',
		docs: '文档',
		resources: '资源',
		guiluo: '归落原',
	},
	hero: {
		title: '洛书南',
		desc: '一段美妙的介绍。',
		primaryButton: '主要按钮',
		secondaryButton: '次要按钮',
	},
	notfound: {
		title: '页面不存在',
		body: '抱歉，您正在尝试访问的页面不存在！',
		button: '返回',
	},
	docs: {
		breadcrumbBase: '文档',
		fallbackTip:
			'请求的页面还没有没有被翻译为您的语言（{0:I18nLocales|localeName}），正在显示 {1:I18nLocales|localeName} 版本。',
		outdatedTip: '此页面的内容不完整或已过时。 如果你能帮忙，请一起更新这篇文章！',
		outdatedTranslationTip: [
			'本文是原始内容的过期翻译，请查阅',
			' {0:I18nLocales|localeName} 版本',
			'以获得最准确的信息。',
			'（欢迎你来帮助更新翻译）！',
		],
		tocHeading: '在本页上',
	},
	news: {
		breadcrumbBase: '新闻',
	},
};

export default zh;
