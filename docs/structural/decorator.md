---
title: 装饰模式
categories:
    - 设计模式
    - 结构型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 装饰模式

:::tip

**装饰模式**是一种结构型设计模式， 允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。
:::

## 结构

![decorator_structure](./decorator_structure.png)

1. 部件 （`Component`） 声明封装器和被封装对象的公用接口。
2. 具体部件 （`Concrete Component`） 类是被封装对象所属的类。 它定义了基础行为， 但装饰类可以改变这些行为。
3. 基础装饰 （`Base Decorator`） 类拥有一个指向被封装对象的引用成员变量。 该变量的类型应当被声明为通用部件接口， 这样它就可以引用具体的部件和装饰。 装饰基类会将所有操作委派给被封装的对象。
4. 具体装饰类 （`Concrete Decorators`） 定义了可动态添加到部件的额外行为。 具体装饰类会重写装饰基类的方法， 并在调用父类方法之前或之后进行额外的行为。
5. 客户端 （`Client`） 可以使用多层装饰来封装部件， 只要它能使用通用接口与所有对象互动即可。

## 适用场景

1. 如果你希望在无需修改代码的情况下即可使用对象， 且希望在运行时为对象新增额外的行为， 可以使用装饰模式。

    1. 装饰能将业务逻辑组织为层次结构， 你可为各层创建一个装饰， 在运行时将各种不同逻辑组合成对象。 由于这些对象都遵循通用接口， 客户端代码能以相同的方式使用这些对象。

2. 如果用继承来扩展对象行为的方案难以实现或者根本不可行， 你可以使用该模式。

    1. 许多编程语言使用 final 最终关键字来限制对某个类的进一步扩展。 复用最终类已有行为的唯一方法是使用装饰模式： 用封装器对其进行封装。

## 优缺点

### 优点

1. 你无需创建新子类即可扩展对象的行为。
2. 你可以在运行时添加或删除对象的功能。
3. 你可以用多个装饰封装对象来组合几种行为。
4. 单一职责原则。 你可以将实现了许多不同行为的一个大类拆分为多个较小的类。

### 缺点

1. 在封装器栈中删除特定封装器比较困难。
2. 实现行为不受装饰栈顺序影响的装饰比较困难。
3. 各层的初始化配置代码看上去可能会很糟糕。

## 与其他模式的关系

1. 适配器模式可以对已有对象的接口进行修改， 装饰模式则能在不改变对象接口的前提下强化对象功能。 此外， 装饰还支持递归组合， 适配器则无法实现。
2. 适配器能为被封装对象提供不同的接口， 代理模式能为对象提供相同的接口， 装饰则能为对象提供加强的接口。
3. 责任链模式和装饰模式的类结构非常相似。 两者都依赖递归组合将需要执行的操作传递给一系列对象。 但是， 两者有几点重要的不同之处。
4. 责任链的管理者可以相互独立地执行一切操作， 还可以随时停止传递请求。 另一方面， 各种装饰可以在遵循基本接口的情况下扩展对象的行为。 此外， 装饰无法中断请求的传递。
5. 组合模式和装饰的结构图很相似， 因为两者都依赖递归组合来组织无限数量的对象。
6. 装饰类似于组合， 但其只有一个子组件。 此外还有一个明显不同： 装饰为被封装对象添加了额外的职责， 组合仅对其子节点的结果进行了 “求和”。但是， 模式也可以相互合作： 你可以使用装饰来扩展组合树中特定对象的行为。
7. 大量使用组合和装饰的设计通常可从对于原型模式的使用中获益。 你可以通过该模式来复制复杂结构， 而非从零开始重新构造。
8. 装饰可让你更改对象的外表， 策略模式则让你能够改变其本质。
9. 装饰和代理有着相似的结构， 但是其意图却非常不同。 这两个模式的构建都基于组合原则， 也就是说一个对象应该将部分工作委派给另一个对象。 两者之间的不同之处在于代理通常自行管理其服务对象的生命周期， 而装饰的生成则总是由客户端进行控制。

## 代码实现

```typescript
interface DecorateComponent {
	operation(): string;
}

class ConcreteComponent implements DecorateComponent {
	public operation(): string {
		return 'ConcreteComponent';
	}
}

class Decorator implements DecorateComponent {
	protected component: DecorateComponent;

	constructor(component: DecorateComponent) {
		this.component = component;
	}

	public operation(): string {
		return this.component.operation();
	}
}

class ConcreteDecoratorA extends Decorator {
	public operation(): string {
		return `ConcreteDecoratorA(${super.operation()})`;
	}
}

class ConcreteDecoratorB extends Decorator {
	public operation(): string {
		return `ConcreteDecoratorB(${super.operation()})`;
	}
}

export { DecorateComponent, ConcreteComponent, Decorator, ConcreteDecoratorA, ConcreteDecoratorB };
```

## 测试用例

```typescript
import { ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB } from '../index';

describe('decorate pattern', () => {
	it('simple component concrete 1', () => {
		const simple = new ConcreteComponent();

		expect(simple.operation()).toBe('ConcreteComponent');
	});

	it('decorated component concrete 2', () => {
		const simple = new ConcreteComponent();
		const decorator1 = new ConcreteDecoratorA(simple);
		const decorator2 = new ConcreteDecoratorB(decorator1);

		expect(decorator2.operation()).toBe(
			'ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))'
		);
	});
});
```
