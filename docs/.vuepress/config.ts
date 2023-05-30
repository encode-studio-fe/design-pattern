import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config';

export default defineConfig4CustomTheme({
	locales: {
		'/': {
			lang: 'zh-CN',
			title: '印客学院',
			description: '设计模式深入浅出',
		},
	},

	themeConfig: {
		nav: [
			{ text: '首页', link: '/index.md' },
			{
				text: '设计模式',
				items: [{ text: '创建者模式', link: '/designPatterns/creational/index.md' }],
			},
		],
		sidebar: [
			{
				title: '创建者模式',
				path: '/designPatterns/creational',
				children: [
					{
						title: '工厂模式',
						path: '/designPatterns/creational/factory.md',
					},
				],
			},
		],
		logo: '/img/logo.png',
		repo: 'encode-studio-fe/design-pattern',
		searchMaxSuggestions: 10,
		lastUpdated: '上次更新',
		docsDir: 'docs',
		footer: {
			createYear: 2023,
			copyrightInfo:
				'Evan Xu | <a href="https://github.com/encode-studio-fe/design-pattern" target="_blank">github</a>',
		},

		extendFrontmatter: {
			author: {
				name: '澄怀',
				link: 'https://github.com/encode-studio-fe/design-pattern',
			},
		},
	},

	head: [
		['link', { rel: 'icon', href: '/img/logo.png' }],
		[
			'meta',
			{
				name: 'keywords',
				content: '设计模式深入浅出',
			},
		],
	],

	plugins: <UserPlugins>[
		[
			'one-click-copy',
			{
				copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
				copyMessage: '复制成功',
				duration: 1000,
				showInMobile: false,
			},
		],

		[
			'vuepress-plugin-zooming',
			{
				selector: '.theme-vdoing-content img:not(.no-zoom)',
				options: {
					bgColor: 'rgba(0,0,0,0.6)',
				},
			},
		],
	],
	extraWatchFiles: ['.vuepress/config.ts'],
});
