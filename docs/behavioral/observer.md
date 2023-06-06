---
title: 观察者模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 观察者模式

:::tip

**观察者模式**是一种行为设计模式， 允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。
:::

## 结构

![observer_structure](./observer_structure.png)

1. 发布者 （`Publisher`） 会向其他对象发送值得关注的事件。 事件会在发布者自身状态改变或执行特定行为后发生。 发布者中包含一个允许新订阅者加入和当前订阅者离开列表的订阅构架。
2. 当新事件发生时， 发送者会遍历订阅列表并调用每个订阅者对象的通知方法。 该方法是在订阅者接口中声明的。
3. 订阅者 （`Subscriber`） 接口声明了通知接口。 在绝大多数情况下， 该接口仅包含一个 update 更新方法。 该方法可以拥有多个参数， 使发布者能在更新时传递事件的详细信息。
4. 具体订阅者 （`Concrete Subscribers`） 可以执行一些操作来回应发布者的通知。 所有具体订阅者类都实现了同样的接口， 因此发布者不需要与具体类相耦合。
5. 订阅者通常需要一些上下文信息来正确地处理更新。 因此， 发布者通常会将一些上下文数据作为通知方法的参数进行传递。 发布者也可将自身作为参数进行传递， 使订阅者直接获取所需的数据。
6. 客户端 （`Client`） 会分别创建发布者和订阅者对象， 然后为订阅者注册发布者更新。

## 适用场景

1. 当一个对象状态的改变需要改变其他对象， 或实际对象是事先未知的或动态变化的时， 可使用观察者模式。

    1. 当你使用图形用户界面类时通常会遇到一个问题。 比如， 你创建了自定义按钮类并允许客户端在按钮中注入自定义代码， 这样当用户按下按钮时就会触发这些代码。
    2. 观察者模式允许任何实现了订阅者接口的对象订阅发布者对象的事件通知。 你可在按钮中添加订阅机制， 允许客户端通过自定义订阅类注入自定义代码。

2. 当应用中的一些对象必须观察其他对象时， 可使用该模式。 但仅能在有限时间内或特定情况下使用。

    1. 订阅列表是动态的， 因此订阅者可随时加入或离开该列表。

## 优缺点

### 优点

1. 开闭原则。 你无需修改发布者代码就能引入新的订阅者类 （如果是发布者接口则可轻松引入发布者类）。
2. 你可以在运行时建立对象之间的联系。

### 缺点

1. 订阅者的通知顺序是随机的。

## 与其他模式的关系

1. 责任链模式、 命令模式、 中介者模式和观察者模式用于处理请求发送者和接收者之间的不同连接方式：
    1. 责任链按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
    2. 命令在发送者和请求者之间建立单向连接。
    3. 中介者清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
    4. 观察者允许接收者动态地订阅或取消接收请求。
2. 中介者和观察者之间的区别往往很难记住。 在大部分情况下， 你可以使用其中一种模式， 而有时可以同时使用。 让我们来看看如何做到这一点。中介者的主要目标是消除一系列系统组件之间的相互依赖。 这些组件将依赖于同一个中介者对象。 观察者的目标是在对象之间建立动态的单向连接， 使得部分对象可作为其他对象的附属发挥作用。有一种流行的中介者模式实现方式依赖于观察者。 中介者对象担当发布者的角色， 其他组件则作为订阅者， 可以订阅中介者的事件或取消订阅。 当中介者以这种方式实现时， 它可能看上去与观察者非常相似。

## 代码实现

```typescript
interface ObserverSubject {
	attach(observer: Observer): void;
	detach(observer: Observer): void;
	notify(): void;
}

class ConcreteSubject implements ObserverSubject {
	public state: number;

	private observers: Observer[] = [];

	public attach(observer: Observer): string {
		const isExist = this.observers.includes(observer);
		if (isExist) {
			return 'Subject: Observer has been attached already.';
		}

		this.observers.push(observer);

		return '';
	}

	public detach(observer: Observer): string {
		const observerIndex = this.observers.indexOf(observer);
		if (observerIndex === -1) {
			return 'Subject: Nonexistent observer.';
		}

		this.observers.splice(observerIndex, 1);
		return '';
	}

	public notify(): string[] {
		let result = [] as string[];
		for (const observer of this.observers) {
			result.push(observer.update(this));
		}
		return result;
	}

	public someBusinessLogic(): string[] {
		return this.notify();
	}
}

interface Observer {
	update(subject: ObserverSubject): string;
}

class ConcreteObserverA implements Observer {
	public update(subject: ObserverSubject): string {
		return 'ConcreteObserverA: Reacted to the event.';
	}
}

class ConcreteObserverB implements Observer {
	public update(subject: ObserverSubject): string {
		return 'ConcreteObserverB: Reacted to the event.';
	}
}

export { ObserverSubject, ConcreteSubject, Observer, ConcreteObserverA, ConcreteObserverB };
```

## 测试用例

```typescript
import { ConcreteSubject, ConcreteObserverA, ConcreteObserverB } from '../index';

describe('observer pattern', () => {
	it('observer concrete creator', () => {
		const subject = new ConcreteSubject();

		const observer1 = new ConcreteObserverA();
		subject.attach(observer1);

		const observer2 = new ConcreteObserverB();
		subject.attach(observer2);

		expect(subject.someBusinessLogic()).toStrictEqual([
			'ConcreteObserverA: Reacted to the event.',
			'ConcreteObserverB: Reacted to the event.',
		]);
		expect(subject.someBusinessLogic()).toStrictEqual([
			'ConcreteObserverA: Reacted to the event.',
			'ConcreteObserverB: Reacted to the event.',
		]);

		subject.detach(observer2);

		expect(subject.someBusinessLogic()).toStrictEqual([
			'ConcreteObserverA: Reacted to the event.',
		]);
	});
});
```
