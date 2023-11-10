import type { FlintTranslation } from '../schema';
import { t, localeLabel } from '../translation';

const zh: FlintTranslation = {
	site: {
		logotype: t`Flint`,
		logoAlt: t`Flint 图标`,
		title: t`Flint`,
	},
	notfound: {
		title: t`页面不存在`,
		body: t`抱歉，您正在尝试访问的页面不存在！`,
		button: t`返回`,
	},
	docs: {
		breadcrumbBase: t`文档`,
		fallbackTip: (source: string, actual: string) =>
			'请求的页面还没有没有被翻译为您的语言' +
			`（${localeLabel(source)}），正在显示 ${localeLabel(actual)} 版本。`,
		outdatedTip: t`此页面的内容不完整或已过时。 如果你能帮忙，请一起更新这篇文章！`,
		outdatedTranslationTip: [
			t`本文是原始内容的过期翻译，请查阅 `,
			(source: string) => `${localeLabel(source)} 版本`,
			t`以获得最准确的信息。`,
			t`（欢迎你来帮助更新翻译）！`,
		],
		tocHeading: t`在本页上`,
	},
};

export default zh;
