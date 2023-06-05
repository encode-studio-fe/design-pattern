---
title: 中介者模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 中介者模式

:::tip

**中介者模式**是一种行为设计模式， 能让你减少对象之间混乱无序的依赖关系。 该模式会限制对象之间的直接交互， 迫使它们通过一个中介者对象进行合作。
:::

## 结构

![mediator_structure](./mediator_structure.png)

1. 组件 （`Component`） 是各种包含业务逻辑的类。 每个组件都有一个指向中介者的引用， 该引用被声明为中介者接口类型。 组件不知道中介者实际所属的类， 因此你可通过将其连接到不同的中介者以使其能在其他程序中复用。
2. 中介者 （`Mediator`） 接口声明了与组件交流的方法， 但通常仅包括一个通知方法。 组件可将任意上下文 （包括自己的对象） 作为该方法的参数， 只有这样接收组件和发送者类之间才不会耦合。
3. 具体中介者 （`Concrete Mediator`） 封装了多种组件间的关系。 具体中介者通常会保存所有组件的引用并对其进行管理， 甚至有时会对其生命周期进行管理。
4. 组件并不知道其他组件的情况。 如果组件内发生了重要事件， 它只能通知中介者。 中介者收到通知后能轻易地确定发送者， 这或许已足以判断接下来需要触发的组件了。对于组件来说， 中介者看上去完全就是一个黑箱。 发送者不知道最终会由谁来处理自己的请求， 接收者也不知道最初是谁发出了请求。

## 适用场景

1. 当一些对象和其他对象紧密耦合以致难以对其进行修改时， 可使用中介者模式。

    1. 该模式让你将对象间的所有关系抽取成为一个单独的类， 以使对于特定组件的修改工作独立于其他组件。

2. 当组件因过于依赖其他组件而无法在不同应用中复用时， 可使用中介者模式。

    1. 应用中介者模式后， 每个组件不再知晓其他组件的情况。 尽管这些组件无法直接交流， 但它们仍可通过中介者对象进行间接交流。 如果你希望在不同应用中复用一个组件， 则需要为其提供一个新的中介者类。

3. 如果为了能在不同情景下复用一些基本行为， 导致你需要被迫创建大量组件子类时， 可使用中介者模式。

    1. 由于所有组件间关系都被包含在中介者中， 因此你无需修改组件就能方便地新建中介者类以定义新的组件合作方式。

## 优缺点

### 优点

1. 单一职责原则。 你可以将多个组件间的交流抽取到同一位置， 使其更易于理解和维护。
2. 开闭原则。 你无需修改实际组件就能增加新的中介者。
3. 你可以减轻应用中多个组件间的耦合情况。
4. 你可以更方便地复用各个组件。

### 缺点

1. 一段时间后， 中介者可能会演化成为上帝对象。

## 与其他模式的关系

1. 责任链模式、 命令模式、 中介者模式和观察者模式用于处理请求发送者和接收者之间的不同连接方式：
    1. 责任链按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
    2. 命令在发送者和请求者之间建立单向连接。
    3. 中介者清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
    4. 观察者允许接收者动态地订阅或取消接收请求。
2. 外观模式和中介者的职责类似： 它们都尝试在大量紧密耦合的类中组织起合作。
    1. 外观为子系统中的所有对象定义了一个简单接口， 但是它不提供任何新功能。 子系统本身不会意识到外观的存在。 子系统中的对象可以直接进行交流。
    2. 中介者将系统中组件的沟通行为中心化。 各组件只知道中介者对象， 无法直接相互交流。
3. 中介者和观察者之间的区别往往很难记住。 在大部分情况下， 你可以使用其中一种模式， 而有时可以同时使用。 让我们来看看如何做到这一点。
    1. 中介者的主要目标是消除一系列系统组件之间的相互依赖。 这些组件将依赖于同一个中介者对象。 观察者的目标是在对象之间建立动态的单向连接， 使得部分对象可作为其他对象的附属发挥作用。
    2. 有一种流行的中介者模式实现方式依赖于观察者。 中介者对象担当发布者的角色， 其他组件则作为订阅者， 可以订阅中介者的事件或取消订阅。 当中介者以这种方式实现时， 它可能看上去与观察者非常相似。
    3. 当你感到疑惑时， 记住可以采用其他方式来实现中介者。 例如， 你可永久性地将所有组件链接到同一个中介者对象。 这种实现方式和观察者并不相同， 但这仍是一种中介者模式。假设有一个程序， 其所有的组件都变成了发布者， 它们之间可以相互建立动态连接。 这样程序中就没有中心化的中介者对象， 而只有一些分布式的观察者。

## 代码实现

```typescript
interface Mediator {
	notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
	private component1: Component1;

	private component2: Component2;

	constructor(c1: Component1, c2: Component2) {
		this.component1 = c1;
		this.component1.setMediator(this);
		this.component2 = c2;
		this.component2.setMediator(this);
	}

	public notify(sender: object, event: string): void {
		if (event === 'A') {
			this.component2.doC();
		}

		if (event === 'D') {
			this.component1.doB();
			this.component2.doC();
		}
	}
}

class BaseComponent {
	protected mediator: Mediator;

	constructor(mediator?: Mediator) {
		this.mediator = mediator!;
	}

	public setMediator(mediator: Mediator): void {
		this.mediator = mediator;
	}
}

class Component1 extends BaseComponent {
	public doA(): string {
		this.mediator.notify(this, 'A');
		return 'component 1 does A ';
	}

	public doB(): string {
		this.mediator.notify(this, 'B');
		return 'component 1 does B ';
	}
}

class Component2 extends BaseComponent {
	public doC(): string {
		this.mediator.notify(this, 'C');
		return 'component 2 does C ';
	}

	public doD(): string {
		this.mediator.notify(this, 'D');
		return 'component 2 does D ';
	}
}

export { Mediator, ConcreteMediator, BaseComponent, Component1, Component2 };
```

## 测试用例

```typescript
import { Component1, Component2, ConcreteMediator } from '../index';

describe('mediator pattern', () => {
	it('mediator concrete creator', () => {
		const c1 = new Component1();
		const c2 = new Component2();
		const mediator = new ConcreteMediator(c1, c2);

		expect(c1.doA()).toBe('component 1 does A ');
		expect(c2.doD()).toBe('component 2 does D ');
	});
});
```
