---
title: 外观模式
categories:
    - 设计模式
    - 结构型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 外观模式

:::tip

**外观模式**是一种结构型设计模式， 能为程序库、 框架或其他复杂类提供一个简单的接口。
:::

## 结构

![facade_structure](./facade_structure.png)

1. 外观 （`Facade`） 提供了一种访问特定子系统功能的便捷方式， 其了解如何重定向客户端请求， 知晓如何操作一切活动部件。
2. 创建附加外观 （`Additional Facade`） 类可以避免多种不相关的功能污染单一外观， 使其变成又一个复杂结构。 客户端和其他外观都可使用附加外观。
3. 复杂子系统 （`Complex Subsystem`） 由数十个不同对象构成。 如果要用这些对象完成有意义的工作， 你必须深入了解子系统的实现细节， 比如按照正确顺序初始化对象和为其提供正确格式的数据。
4. 客户端 （`Client`） 使用外观代替对子系统对象的直接调用。

## 适用场景

1. 如果你需要一个指向复杂子系统的直接接口， 且该接口的功能有限， 则可以使用外观模式。

    1. 子系统通常会随着时间的推进变得越来越复杂。 即便是应用了设计模式， 通常你也会创建更多的类。 尽管在多种情形中子系统可能是更灵活或易于复用的， 但其所需的配置和样板代码数量将会增长得更快。 为了解决这个问题， 外观将会提供指向子系统中最常用功能的快捷方式， 能够满足客户端的大部分需求。

2. 如果需要将子系统组织为多层结构， 可以使用外观。

    1. 创建外观来定义子系统中各层次的入口。 你可以要求子系统仅使用外观来进行交互， 以减少子系统之间的耦合。

## 优缺点

### 优点

1. 你可以让自己的代码独立于复杂子系统。

### 缺点

1. 外观可能成为与程序中所有类都耦合的上帝对象。

## 与其他模式的关系

1. 外观模式为现有对象定义了一个新接口， 适配器模式则会试图运用已有的接口。 适配器通常只封装一个对象， 外观通常会作用于整个对象子系统上。
2. 当只需对客户端代码隐藏子系统创建对象的方式时， 你可以使用抽象工厂模式来代替外观。
3. 享元模式展示了如何生成大量的小型对象， 外观则展示了如何用一个对象来代表整个子系统。
4. 外观和中介者模式的职责类似： 它们都尝试在大量紧密耦合的类中组织起合作。
    1. 外观为子系统中的所有对象定义了一个简单接口， 但是它不提供任何新功能。 子系统本身不会意识到外观的存在。 子系统中的对象可以直接进行交流。
    2. 中介者将系统中组件的沟通行为中心化。 各组件只知道中介者对象， 无法直接相互交流。
5. 外观类通常可以转换为单例模式类， 因为在大部分情况下一个外观对象就足够了。
6. 外观与代理模式的相似之处在于它们都缓存了一个复杂实体并自行对其进行初始化。 代理与其服务对象遵循同一接口， 使得自己和服务对象可以互换， 在这一点上它与外观不同。

## 代码实现

```typescript
class Facade {
	protected subsystem1: Subsystem1;

	protected subsystem2: Subsystem2;

	constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
		this.subsystem1 = subsystem1 || new Subsystem1();
		this.subsystem2 = subsystem2 || new Subsystem2();
	}

	public operation(): string[] {
		let result: string[] = [];
		result.push(this.subsystem1.operation1());
		result.push(this.subsystem2.operation1());
		result.push(this.subsystem1.operationN());
		result.push(this.subsystem2.operationZ());

		return result;
	}
}

class Subsystem1 {
	public operation1(): string {
		return 'Subsystem1: Ready!';
	}

	public operationN(): string {
		return 'Subsystem1: Go!';
	}
}

class Subsystem2 {
	public operation1(): string {
		return 'Subsystem2: Get ready!';
	}

	public operationZ(): string {
		return 'Subsystem2: Fire!';
	}
}

export { Facade, Subsystem1, Subsystem2 };
```

## 测试用例

```typescript
import { Subsystem1, Subsystem2, Facade } from '../index';

describe('facade pattern', () => {
	it('facade concrete', () => {
		const subsystem1 = new Subsystem1();
		const subsystem2 = new Subsystem2();
		const facade = new Facade(subsystem1, subsystem2);

		expect(facade.operation()).toStrictEqual([
			'Subsystem1: Ready!',
			'Subsystem2: Get ready!',
			'Subsystem1: Go!',
			'Subsystem2: Fire!',
		]);
	});
});
```
