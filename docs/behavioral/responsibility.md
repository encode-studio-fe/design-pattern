---
title: 责任链模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 责任链模式

:::tip

**责任链模式**是一种行为设计模式， 允许你将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。
:::

## 结构

![responsibility_structure](./responsibility_structure.png)

1. 处理者 （`Handler`） 声明了所有具体处理者的通用接口。 该接口通常仅包含单个方法用于请求处理， 但有时其还会包含一个设置链上下个处理者的方法。
2. 基础处理者 （`Base Handler`） 是一个可选的类， 你可以将所有处理者共用的样本代码放置在其中。通常情况下， 该类中定义了一个保存对于下个处理者引用的成员变量。 客户端可通过将处理者传递给上个处理者的构造函数或设定方法来创建链。 该类还可以实现默认的处理行为： 确定下个处理者存在后再将请求传递给它。
3. 具体处理者 （`Concrete Handlers`） 包含处理请求的实际代码。 每个处理者接收到请求后， 都必须决定是否进行处理， 以及是否沿着链传递请求。处理者通常是独立且不可变的， 需要通过构造函数一次性地获得所有必要地数据。
4. 客户端 （`Client`） 可根据程序逻辑一次性或者动态地生成链。 值得注意的是， 请求可发送给链上的任意一个处理者， 而非必须是第一个处理者。

## 适用场景

1. 当程序需要使用不同方式处理不同种类请求， 而且请求类型和顺序预先未知时， 可以使用责任链模式。

    1. 该模式能将多个处理者连接成一条链。 接收到请求后， 它会 “询问” 每个处理者是否能够对其进行处理。 这样所有处理者都有机会来处理请求。

2. 当必须按顺序执行多个处理者时， 可以使用该模式。

    1. 无论你以何种顺序将处理者连接成一条链， 所有请求都会严格按照顺序通过链上的处理者。

3. 如果所需处理者及其顺序必须在运行时进行改变， 可以使用责任链模式。

    1. 如果在处理者类中有对引用成员变量的设定方法， 你将能动态地插入和移除处理者， 或者改变其顺序。

## 优缺点

### 优点

1. 你可以控制请求处理的顺序。
2. 单一职责原则。 你可对发起操作和执行操作的类进行解耦。
3. 开闭原则。 你可以在不更改现有代码的情况下在程序中新增处理者。

### 缺点

1. 部分请求可能未被处理。

## 与其他模式的关系

1. 责任链模式、 命令模式、 中介者模式和观察者模式用于处理请求发送者和接收者之间的不同连接方式：
    1. 责任链按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
    2. 命令在发送者和请求者之间建立单向连接。
    3. 中介者清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
    4. 观察者允许接收者动态地订阅或取消接收请求。
2. 责任链通常和组合模式结合使用。 在这种情况下， 叶组件接收到请求后， 可以将请求沿包含全体父组件的链一直传递至对象树的底部。
3. 责任链的管理者可使用命令模式实现。 在这种情况下， 你可以对由请求代表的同一个上下文对象执行许多不同的操作。还有另外一种实现方式， 那就是请求自身就是一个命令对象。 在这种情况下， 你可以对由一系列不同上下文连接而成的链执行相同的操作。
4. 责任链和装饰模式的类结构非常相似。 两者都依赖递归组合将需要执行的操作传递给一系列对象。 但是， 两者有几点重要的不同之处。
5. 责任链的管理者可以相互独立地执行一切操作， 还可以随时停止传递请求。 另一方面， 各种装饰可以在遵循基本接口的情况下扩展对象的行为。 此外， 装饰无法中断请求的传递。

## 代码实现

```typescript
interface Handler {
	setNext(handler: Handler): Handler;

	handle(request: string): string;
}

abstract class AbstractHandler implements Handler {
	private nextHandler: Handler;

	public setNext(handler: Handler): Handler {
		this.nextHandler = handler;

		return handler;
	}

	public handle(request: string): string {
		if (this.nextHandler) {
			return this.nextHandler.handle(request);
		}

		return '';
	}
}

class MonkeyHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Banana') {
			return request;
		}
		return super.handle(request);
	}
}

class SquirrelHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Nut') {
			return request;
		}
		return super.handle(request);
	}
}

class DogHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'MeatBall') {
			return request;
		}
		return super.handle(request);
	}
}

export { Handler, AbstractHandler, MonkeyHandler, SquirrelHandler, DogHandler };
```

## 测试用例

```typescript
import { MonkeyHandler, SquirrelHandler, DogHandler } from '../index';

describe('responsibility pattern', () => {
	it('responsibility concrete creator', () => {
		const list = [] as string[];
		const monkey = new MonkeyHandler();
		const squirrel = new SquirrelHandler();
		const dog = new DogHandler();

		monkey.setNext(squirrel).setNext(dog);

		const foods = ['Nut', 'Banana', 'Cup of coffee'];

		for (const food of foods) {
			const result = monkey.handle(food);
			if (result) {
				list.push(result);
			}
		}
		expect(list).toStrictEqual(['Nut', 'Banana']);
	});
});
```
