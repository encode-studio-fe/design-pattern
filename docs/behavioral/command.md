---
title: 命令模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 命令模式

:::tip

**命令模式**是一种行为设计模式， 它可将请求转换为一个包含与请求相关的所有信息的独立对象。 该转换让你能根据不同的请求将方法参数化、 延迟请求执行或将其放入队列中， 且能实现可撤销操作。
:::

## 结构

![command_structure](./command_structure.png)

1. 发送者 （`Sender`）——亦称 “触发者 （Invoker）”——类负责对请求进行初始化， 其中必须包含一个成员变量来存储对于命令对象的引用。 发送者触发命令， 而不向接收者直接发送请求。 注意， 发送者并不负责创建命令对象： 它通常会通过构造函数从客户端处获得预先生成的命令。
2. 命令 （`Command`） 接口通常仅声明一个执行命令的方法。
3. 具体命令 （`Concrete Commands`） 会实现各种类型的请求。 具体命令自身并不完成工作， 而是会将调用委派给一个业务逻辑对象。 但为了简化代码， 这些类可以进行合并。接收对象执行方法所需的参数可以声明为具体命令的成员变量。 你可以将命令对象设为不可变， 仅允许通过构造函数对这些成员变量进行初始化。
4. 接收者 （`Receiver`） 类包含部分业务逻辑。 几乎任何对象都可以作为接收者。 绝大部分命令只处理如何将请求传递到接收者的细节， 接收者自己会完成实际的工作。
5. 客户端 （`Client`） 会创建并配置具体命令对象。 客户端必须将包括接收者实体在内的所有请求参数传递给命令的构造函数。 此后， 生成的命令就可以与一个或多个发送者相关联了。

## 适用场景

1. 如果你需要通过操作来参数化对象， 可使用命令模式。

    1. 命令模式可将特定的方法调用转化为独立对象。 这一改变也带来了许多有趣的应用： 你可以将命令作为方法的参数进行传递、 将命令保存在其他对象中， 或者在运行时切换已连接的命令等。
    2. 举个例子： 你正在开发一个 GUI 组件 （例如上下文菜单）， 你希望用户能够配置菜单项， 并在点击菜单项时触发操作。

2. 如果你想要将操作放入队列中、 操作的执行或者远程执行操作， 可使用命令模式。

    1. 同其他对象一样， 命令也可以实现序列化 （序列化的意思是转化为字符串）， 从而能方便地写入文件或数据库中。 一段时间后， 该字符串可被恢复成为最初的命令对象。 因此， 你可以延迟或计划命令的执行。 但其功能远不止如此！ 使用同样的方式， 你还可以将命令放入队列、 记录命令或者通过网络发送命令。

3. 如果你想要实现操作回滚功能， 可使用命令模式。

    1. 尽管有很多方法可以实现撤销和恢复功能， 但命令模式可能是其中最常用的一种。
    2. 为了能够回滚操作， 你需要实现已执行操作的历史记录功能。 命令历史记录是一种包含所有已执行命令对象及其相关程序状态备份的栈结构。
    3. 这种方法有两个缺点。 首先， 程序状态的保存功能并不容易实现， 因为部分状态可能是私有的。 你可以使用备忘录模式来在一定程度上解决这个问题。
    4. 其次， 备份状态可能会占用大量内存。 因此， 有时你需要借助另一种实现方式： 命令无需恢复原始状态， 而是执行反向操作。 反向操作也有代价： 它可能会很难甚至是无法实现。

## 优缺点

### 优点

1. 单一职责原则。 你可以解耦触发和执行操作的类。
2. 开闭原则。 你可以在不修改已有客户端代码的情况下在程序中创建新的命令。
3. 你可以实现撤销和恢复功能。
4. 你可以实现操作的延迟执行。
5. 你可以将一组简单命令组合成一个复杂命令。

### 缺点

1. 代码可能会变得更加复杂， 因为你在发送者和接收者之间增加了一个全新的层次。

## 与其他模式的关系

1. 责任链模式、 命令模式、 中介者模式和观察者模式用于处理请求发送者和接收者之间的不同连接方式：
    1. 责任链按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
    2. 命令在发送者和请求者之间建立单向连接。
    3. 中介者清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
    4. 观察者允许接收者动态地订阅或取消接收请求。
2. 责任链的管理者可使用命令模式实现。 在这种情况下， 你可以对由请求代表的同一个上下文对象执行许多不同的操作。还有另外一种实现方式， 那就是请求自身就是一个命令对象。 在这种情况下， 你可以对由一系列不同上下文连接而成的链执行相同的操作。你可以同时使用命令和备忘录模式来实现 “撤销”。 在这种情况下， 命令用于对目标对象执行各种不同的操作， 备忘录用来保存一条命令执行前该对象的状态。
3. 命令和策略模式看上去很像， 因为两者都能通过某些行为来参数化对象。 但是， 它们的意图有非常大的不同。你可以使用命令来将任何操作转换为对象。 操作的参数将成为对象的成员变量。 你可以通过转换来延迟操作的执行、 将操作放入队列、 保存历史命令或者向远程服务发送命令等。另一方面， 策略通常可用于描述完成某件事的不同方式， 让你能够在同一个上下文类中切换算法。
4. 原型模式可用于保存命令的历史记录。
5. 你可以将访问者模式视为命令模式的加强版本， 其对象可对不同类的多种对象执行操作。

## 代码实现

```typescript
interface Command {
	execute(): string;
}

class SimpleCommand implements Command {
	private payload: string;

	constructor(payload: string) {
		this.payload = payload;
	}

	public execute(): string {
		return `SimpleCommand: ${this.payload}`;
	}
}

class ComplexCommand implements Command {
	private receiver: Receiver;

	private a: string;

	private b: string;

	constructor(receiver: Receiver, a: string, b: string) {
		this.receiver = receiver;
		this.a = a;
		this.b = b;
	}

	public execute(): string {
		return this.receiver.doSomething(this.a) + ' ' + this.receiver.doSomethingElse(this.b);
	}
}

class Receiver {
	public doSomething(a: string): string {
		return a;
	}

	public doSomethingElse(b: string): string {
		return b;
	}
}

class Invoker {
	private onStart: Command;

	private onFinish: Command;

	public setOnStart(command: Command): void {
		this.onStart = command;
	}

	public setOnFinish(command: Command): void {
		this.onFinish = command;
	}

	public doSomethingImportant() {
		if (this.isCommand(this.onStart)) {
			return this.onStart.execute();
		}

		// if (this.isCommand(this.onFinish)) {
		// 	return this.onFinish.execute();
		// }
	}

	private isCommand(object): object is Command {
		return object.execute !== undefined;
	}
}

export { Command, SimpleCommand, ComplexCommand, Receiver, Invoker };
```

## 测试用例

```typescript
import { Invoker, Receiver, SimpleCommand, ComplexCommand } from '../index';

describe('command pattern', () => {
	it('command concrete creator', () => {
		const invoker = new Invoker();
		const receiver = new Receiver();

		invoker.setOnStart(new SimpleCommand('Say Hi!'));
		invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

		expect(invoker.doSomethingImportant()).toBe('SimpleCommand: Say Hi!');
		// expect(invoker.doSomethingImportant()).toBe('Send email Save report');
	});
});
```
