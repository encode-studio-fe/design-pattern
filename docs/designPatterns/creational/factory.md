---
title: 工厂模式
categories:
    - 设计模式
    - 创建型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 工厂模式

:::tip

**工厂模式**是一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。
:::

## 背景

工厂方法模式建议使用特殊的工厂方法代替对于对象构造函数的直接调用 （即使用`new`运算符）。 工厂方法返回的对象通常被称作 “产品”。

乍看之下， 这种更改可能毫无意义： 我们只是改变了程序中调用构造函数的位置而已。 但是， 仔细想一下， 现在你可以在子类中重写工厂方法， 从而改变其创建产品的类型。

但有一点需要注意:仅当这些产品具有共同的基类或者接口时， 子类才能返回不同类型的产品， 同时基类中的工厂方法还应将其返回类型声明为这一共有接口。

## 结构

![factory_structure](/img/factory_structure.png)

1. 产品 （`Product`）:将会对接口进行声明。 对于所有由创建者及其子类构建的对象， 这些接口都是通用的。
2. 具体产品 （`Concrete Products`） 是产品接口的不同实现。
3. 创建者 （`Creator`） 类声明返回产品对象的工厂方法。 该方法的返回对象类型必须与产品接口相匹配。你可以将工厂方法声明为抽象方法， 强制要求每个子类以不同方式实现该方法。 或者， 你也可以在基础工厂方法中返回默认产品类型。注意， 尽管它的名字是创建者， 但它最主要的职责并不是创建产品。 一般来说， 创建者类包含一些与产品相关的核心业务逻辑。
4. 具体创建者 （`Concrete Creators`） 将会重写基础工厂方法， 使其返回不同类型的产品。注意， 并不一定每次调用工厂方法都会创建新的实例。 工厂方法也可以返回缓存、 对象池或其他来源的已有对象。

## 适用场景

1. 当你在编写代码的过程中， 如果无法预知对象确切类别及其依赖关系时， 可使用工厂方法。

    1. 工厂方法将创建产品的代码与实际使用产品的代码分离， 从而能在不影响其他代码的情况下扩展产品创建部分代码；
    2. 例如， 如果需要向应用中添加一种新产品， 你只需要开发新的创建者子类， 然后重写其工厂方法即可。

2. 如果你希望用户能扩展你软件库或框架的内部组件， 可使用工厂方法。
    1. 继承可能是扩展软件库或框架默认行为的最简单方法。 但是当你使用子类替代标准组件时， 框架如何辨识出该子类？
    2. 解决方案是将各框架中构造组件的代码集中到单个工厂方法中， 并在继承该组件之外允许任何人对该方法进行重写。

## 优缺点

### 优点

1. 你可以避免创建者和具体产品之间的紧密耦合。
2. 单一职责原则。 你可以将产品创建代码放在程序的单一位置， 从而使得代码更容易维护。
3. 开闭原则。 无需更改现有客户端代码， 你就可以在程序中引入新的产品类型。

### 缺点

1. 应用工厂方法模式需要引入许多新的子类， 代码可能会因此变得更复杂。 最好的情况是将该模式引入创建者类的现有层次结构中。

## 与其他模式的关系

1. 在许多设计工作的初期都会使用工厂方法模式 （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用抽象工厂模式、 原型模式或生成器模式 （更灵活但更加复杂）。
2. 抽象工厂模式通常基于一组工厂方法， 但你也可以使用原型模式来生成这些类的方法。
3. 你可以同时使用工厂方法和迭代器模式来让子类集合返回不同类型的迭代器， 并使得迭代器与集合相匹配。
4. 原型并不基于继承， 因此没有继承的缺点。 另一方面， 原型需要对被复制对象进行复杂的初始化。 工厂方法基于继承， 但是它不需要初始化步骤。
5. 工厂方法是模板方法模式的一种特殊形式。 同时， 工厂方法可以作为一个大型模板方法中的一个步骤。

## 代码实现

```typescript
interface Product {
	operation(): string;
}

abstract class Creator {
	public abstract factoryMethod(): Product;

	public someOperation(): string {
		const product = this.factoryMethod();

		return `Creator: The same creator's code has just worked with ${product.operation()}`;
	}
}

class ConcreteCreator1 extends Creator {
	public factoryMethod(): Product {
		return new ConcreteProduct1();
	}
}

class ConcreteCreator2 extends Creator {
	public factoryMethod(): Product {
		return new ConcreteProduct2();
	}
}

class ConcreteProduct1 implements Product {
	public operation(): string {
		return 'ConcreteProduct1';
	}
}

class ConcreteProduct2 implements Product {
	public operation(): string {
		return 'ConcreteProduct2';
	}
}

export { Product, Creator, ConcreteCreator1, ConcreteCreator2, ConcreteProduct1, ConcreteProduct2 };
```

## 测试用例

```typescript
describe('factory pattern', () => {
	it('factory concrete creator 1', () => {
		const creator1 = new ConcreteCreator1();

		expect(creator1.someOperation()).toBe(
			"Creator: The same creator's code has just worked with ConcreteProduct1"
		);
	});
	it('factory concrete creator 2', () => {
		const creator1 = new ConcreteCreator2();

		expect(creator1.someOperation()).toBe(
			"Creator: The same creator's code has just worked with ConcreteProduct2"
		);
	});
});
```
