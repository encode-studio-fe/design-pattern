import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config';

export default defineConfig4CustomTheme({
	locales: {
		'/': {
			lang: 'zh-CN',
			title: '印客学院',
			description: '设计模式深入浅出',
		},
	},
	base: '/design-pattern/',
	themeConfig: {
		nav: [
			{ text: '首页', link: '/index.md' },
			{
				text: '设计模式',
				items: [
					{ text: '创建者模式', link: '/creational/index.md' },
					{ text: '结构型模式', link: '/structural/index.md' },
					{ text: '行为模式', link: '/behavioral/index.md' },
				],
			},
		],
		sidebar: [
			{
				title: '创建者模式',
				path: '/creational',
				children: [
					{
						title: '工厂模式',
						path: '/creational/factory.md',
					},
					{
						title: '抽象工厂模式',
						path: '/creational/abstract_factory.md',
					},
					{
						title: '生成器模式',
						path: '/creational/builder.md',
					},
					{
						title: '原型模式',
						path: '/creational/prototype.md',
					},
					{
						title: '单例模式',
						path: '/creational/singleton.md',
					},
				],
			},
			{
				title: '结构型模式',
				path: '/structural',
				children: [
					{
						title: '适配器模式',
						path: '/structural/adapter.md',
					},
					{
						title: '桥接模式',
						path: '/structural/bridge.md',
					},
					{
						title: '组合模式',
						path: '/structural/composite.md',
					},
					{
						title: '装饰模式',
						path: '/structural/decorator.md',
					},
					{
						title: '外观模式',
						path: '/structural/facade.md',
					},
					{
						title: '享元模式',
						path: '/structural/flyweight.md',
					},
					{
						title: '代理模式',
						path: '/structural/proxy.md',
					},
				],
			},
			{
				title: '行为模式',
				path: '/behavioral',
				children: [
					{
						title: '责任链模式',
						path: '/behavioral/responsibility.md',
					},
					{
						title: '命令模式',
						path: '/behavioral/command.md',
					},
					{
						title: '迭代器模式',
						path: '/behavioral/iterator.md',
					},
					{
						title: '中介者模式',
						path: '/behavioral/mediator.md',
					},
					{
						title: '备忘录模式',
						path: '/behavioral/memento.md',
					},
				],
			},
		],
		logo: '/img/logo.png',
		repo: 'encode-studio-fe/design-pattern',
		searchMaxSuggestions: 10,
		docsDir: 'docs',
		footer: {
			createYear: 2023,
			copyrightInfo:
				'encode studio | <a href="https://github.com/encode-studio-fe/design-pattern" target="_blank">github</a>',
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
