---
title: 抽象工厂模式
categories:
    - 设计模式
    - 创建型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 抽象工厂模式

:::tip

**抽象工厂模式**是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。
:::

## 结构

![abstract_factory_structure](./abstract_factory_structure.png)

1. 抽象产品 （`Abstract Product`） 为构成系列产品的一组不同但相关的产品声明接口。
2. 具体产品 （`Concrete Product`） 是抽象产品的多种不同类型实现。 所有变体 （维多利亚/现代） 都必须实现相应的抽象产品 （椅子/沙发）。
3. 抽象工厂 （`Abstract Factory`） 接口声明了一组创建各种抽象产品的方法。
4. 具体工厂 （`Concrete Factory`） 实现抽象工厂的构建方法。 每个具体工厂都对应特定产品变体， 且仅创建此种产品变体。
5. 尽管具体工厂会对具体产品进行初始化， 其构建方法签名必须返回相应的抽象产品。 这样， 使用工厂类的客户端代码就不会与工厂创建的特定产品变体耦合。 客户端 （`Client`） 只需通过抽象接口调用工厂和产品对象， 就能与任何具体工厂/产品变体交互。

## 适用场景

1. 如果代码需要与多个不同系列的相关产品交互， 但是由于无法提前获取相关信息， 或者出于对未来扩展性的考虑， 你不希望代码基于产品的具体类进行构建， 在这种情况下， 你可以使用抽象工厂。

    1. 抽象工厂为你提供了一个接口， 可用于创建每个系列产品的对象。 只要代码通过该接口创建对象， 那么你就不会生成与应用程序已生成的产品类型不一致的产品。

2. 如果你有一个基于一组抽象方法的类， 且其主要功能因此变得不明确， 那么在这种情况下可以考虑使用抽象工厂模式。

    1. 在设计良好的程序中， 每个类仅负责一件事。 如果一个类与多种类型产品交互， 就可以考虑将工厂方法抽取到独立的工厂类或具备完整功能的抽象工厂类中。

## 优缺点

### 优点

1. 你可以确保同一工厂生成的产品相互匹配。
2. 你可以避免客户端和具体产品代码的耦合。
3. 单一职责原则。 你可以将产品生成代码抽取到同一位置， 使得代码易于维护。
4. 开闭原则。 向应用程序中引入新产品变体时， 你无需修改客户端代码。

### 缺点

1. 由于采用该模式需要向应用中引入众多接口和类， 代码可能会比之前更加复杂。

## 与其他模式的关系

1. 在许多设计工作的初期都会使用工厂方法模式 （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用抽象工厂模式、 原型模式或生成器模式 （更灵活但更加复杂）。
2. 生成器重点关注如何分步生成复杂对象。 抽象工厂专门用于生产一系列相关对象。 抽象工厂会马上返回产品， 生成器则允许你在获取产品前执行一些额外构造步骤。
3. 抽象工厂模式通常基于一组工厂方法， 但你也可以使用原型模式来生成这些类的方法。
4. 当只需对客户端代码隐藏子系统创建对象的方式时， 你可以使用抽象工厂来代替外观模式。
5. 你可以将抽象工厂和桥接模式搭配使用。 如果由桥接定义的抽象只能与特定实现合作， 这一模式搭配就非常有用。 在这种情况下， 抽象工厂可以对这些关系进行封装， 并且对客户端代码隐藏其复杂性。
6. 抽象工厂、 生成器和原型都可以用单例模式来实现。

## 代码实现

```typescript
interface AbstractFactory {
	createProductA(): AbstractProductA;

	createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new ConcreteProductA1();
	}

	public createProductB(): AbstractProductB {
		return new ConcreteProductB1();
	}
}

class ConcreteFactory2 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new ConcreteProductA2();
	}

	public createProductB(): AbstractProductB {
		return new ConcreteProductB2();
	}
}

interface AbstractProductA {
	usefulFunctionA(): string;
}

class ConcreteProductA1 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'the product A1.';
	}
}

class ConcreteProductA2 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'the product A2.';
	}
}

interface AbstractProductB {
	usefulFunctionB(): string;

	anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
	public usefulFunctionB(): string {
		return 'The result of the product B1.';
	}

	public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B1 collaborating with ${result}`;
	}
}

class ConcreteProductB2 implements AbstractProductB {
	public usefulFunctionB(): string {
		return 'The result of the product B2.';
	}

	public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B2 collaborating with ${result}`;
	}
}

export {
	AbstractFactory,
	ConcreteFactory1,
	ConcreteFactory2,
	AbstractProductA,
	ConcreteProductA1,
	ConcreteProductA2,
	AbstractProductB,
	ConcreteProductB2,
};
```

## 测试用例

```typescript
import { ConcreteFactory1, ConcreteFactory2 } from '../index';

describe('abstract factory pattern', () => {
	it('abstract factory concrete creator 1', () => {
		const factory1 = new ConcreteFactory1();

		const productA = factory1.createProductA();
		const productB = factory1.createProductB();

		expect(productB.usefulFunctionB()).toBe('The result of the product B1.');
		expect(productB.anotherUsefulFunctionB(productA)).toBe(
			'The result of the B1 collaborating with the product A1.'
		);
	});

	it('abstract factory concrete creator 1', () => {
		const factory1 = new ConcreteFactory2();

		const productA = factory1.createProductA();
		const productB = factory1.createProductB();

		expect(productB.usefulFunctionB()).toBe('The result of the product B2.');
		expect(productB.anotherUsefulFunctionB(productA)).toBe(
			'The result of the B2 collaborating with the product A2.'
		);
	});
});
```
