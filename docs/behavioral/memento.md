---
title: 备忘录模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 备忘录模式

:::tip

**备忘录模式**是一种行为设计模式， 允许在不暴露对象实现细节的情况下保存和恢复对象之前的状态。
:::

## 结构

### 基于嵌套类的实现

![memento_structure](./memento_structure.png)

1. 原发器 （`Originator`） 类可以生成自身状态的快照， 也可以在需要时通过快照恢复自身状态。
2. 备忘录 （`Memento`） 是原发器状态快照的值对象 （value object）。 通常做法是将备忘录设为不可变的， 并通过构造函数一次性传递数据。
3. 负责人 （`Caretaker`） 仅知道 “何时” 和 “为何” 捕捉原发器的状态， 以及何时恢复状态。负责人通过保存备忘录栈来记录原发器的历史状态。 当原发器需要回溯历史状态时， 负责人将从栈中获取最顶部的备忘录， 并将其传递给原发器的恢复 （restoration） 方法。
4. 在该实现方法中， 备忘录类将被嵌套在原发器中。 这样原发器就可访问备忘录的成员变量和方法， 即使这些方法被声明为私有。 另一方面， 负责人对于备忘录的成员变量和方法的访问权限非常有限： 它们只能在栈中保存备忘录， 而不能修改其状态。

### 基于中间接口的实现

![memento_middleware_structure](./memento_middleware_structure.png)

1. 在没有嵌套类的情况下， 你可以规定负责人仅可通过明确声明的中间接口与备忘录互动， 该接口仅声明与备忘录元数据相关的方法， 限制其对备忘录成员变量的直接访问权限。
2. 另一方面， 原发器可以直接与备忘录对象进行交互， 访问备忘录类中声明的成员变量和方法。 这种方式的缺点在于你需要将备忘录的所有成员变量声明为公有。

### 封装更加严格的实现

![memento_strict_structure](./memento_strict_structure.png)

1. 这种实现方式允许存在多种不同类型的原发器和备忘录。 每种原发器都和其相应的备忘录类进行交互。 原发器和备忘录都不会将其状态暴露给其他类。
2. 负责人此时被明确禁止修改存储在备忘录中的状态。 但负责人类将独立于原发器， 因为此时恢复方法被定义在了备忘录类中。
3. 每个备忘录将与创建了自身的原发器连接。 原发器会将自己及状态传递给备忘录的构造函数。 由于这些类之间的紧密联系， 只要原发器定义了合适的设置器 （setter）， 备忘录就能恢复其状态。

## 适用场景

1. 当你需要创建对象状态快照来恢复其之前的状态时， 可以使用备忘录模式。

    1. 备忘录模式允许你复制对象中的全部状态 （包括私有成员变量）， 并将其独立于对象进行保存。 尽管大部分人因为 “撤销” 这个用例才记得该模式， 但其实它在处理事务 （比如需要在出现错误时回滚一个操作） 的过程中也必不可少。

2. 当直接访问对象的成员变量、 获取器或设置器将导致封装被突破时， 可以使用该模式。

    1. 备忘录让对象自行负责创建其状态的快照。 任何其他对象都不能读取快照， 这有效地保障了数据的安全性。

## 优缺点

### 优点

1. 你可以在不破坏对象封装情况的前提下创建对象状态快照。
2. 你可以通过让负责人维护原发器状态历史记录来简化原发器代码。

### 缺点

1. 如果客户端过于频繁地创建备忘录， 程序将消耗大量内存。
2. 负责人必须完整跟踪原发器的生命周期， 这样才能销毁弃用的备忘录。
3. 绝大部分动态编程语言 （例如 PHP、 Python 和 JavaScript） 不能确保备忘录中的状态不被修改。

## 与其他模式的关系

1. 你可以同时使用命令模式和备忘录模式来实现 “撤销”。 在这种情况下， 命令用于对目标对象执行各种不同的操作， 备忘录用来保存一条命令执行前该对象的状态。
2. 你可以同时使用备忘录和迭代器模式来获取当前迭代器的状态， 并且在需要的时候进行回滚。
3. 有时候原型模式可以作为备忘录的一个简化版本， 其条件是你需要在历史记录中存储的对象的状态比较简单， 不需要链接其他外部资源， 或者链接可以方便地重建。

## 代码实现

```typescript
class Originator {
	private state: string;

	constructor(state: string) {
		this.state = state;
	}

	public doSomething(): string {
		this.state = this.generateRandomString(30);
		return this.state;
	}

	private generateRandomString(length: number = 10): string {
		const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		return Array.apply(null, { length })
			.map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
			.join('');
	}

	public save(): Memento {
		return new ConcreteMemento(this.state);
	}

	public restore(memento: Memento): string {
		this.state = memento.getState();
		return this.state;
	}
}

interface Memento {
	getState(): string;

	getName(): string;

	getDate(): string;
}

class ConcreteMemento implements Memento {
	private state: string;

	private date: string;

	constructor(state: string) {
		this.state = state;
		this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	}

	public getState(): string {
		return this.state;
	}

	public getName(): string {
		return `${this.date} / (${this.state.substr(0, 9)}...)`;
	}

	public getDate(): string {
		return this.date;
	}
}

class Caretaker {
	private mementos: Memento[] = [];

	private originator: Originator;

	constructor(originator: Originator) {
		this.originator = originator;
	}

	public backup(): void {
		this.mementos.push(this.originator.save());
	}

	public undo(): string {
		if (!this.mementos.length) {
			return '';
		}
		const memento = this.mementos.pop();

		return this.originator.restore(memento!);
	}

	public showHistory(): void {
		for (const memento of this.mementos) {
			console.log(memento.getName());
		}
	}
}

export { Originator, Memento, ConcreteMemento, Caretaker };
```

## 测试用例

```typescript
import { Originator, Caretaker } from '../index';

describe('memento pattern', () => {
	it('memento concrete creator', () => {
		const originator = new Originator('Super-duper-super-puper-super.');
		const caretaker = new Caretaker(originator);

		caretaker.backup();
		const backUp1 = originator.doSomething();

		caretaker.backup();
		const backUp2 = originator.doSomething();

		caretaker.backup();

		caretaker.showHistory();

		expect(caretaker.undo()).toBe(backUp2);

		expect(caretaker.undo()).toBe(backUp1);
	});
});
```
