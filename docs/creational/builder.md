---
title: 生成器模式
categories:
    - 设计模式
    - 创建型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 生成器模式

:::tip

**生成器模式**是一种创建型设计模式，允许使用相同的创建代码生成不同类型和形式的对象。
:::

## 结构

![builder_structure](./builder_structure.png)

1. 生成器 （`Builder`） 接口声明在所有类型生成器中通用的产品构造步骤。
2. 具体生成器 （`Concrete Builders`） 提供构造过程的不同实现。 具体生成器也可以构造不遵循通用接口的产品。
3. 产品 （`Products`） 是最终生成的对象。 由不同生成器构造的产品无需属于同一类层次结构或接口。
4. 主管 （`Director`） 类定义调用构造步骤的顺序， 这样你就可以创建和复用特定的产品配置。
5. 客户端 （`Client`） 必须将某个生成器对象与主管类关联。 一般情况下， 你只需通过主管类构造函数的参数进行一次性关联即可。 此后主管类就能使用生成器对象完成后续所有的构造任务。 但在客户端将生成器对象传递给主管类制造方法时还有另一种方式。 在这种情况下， 你在使用主管类生产产品时每次都可以使用不同的生成器。

## 适用场景

1. 使用生成器模式可避免 “重叠构造函数 （`telescoping constructor`）” 的出现。

    1. 假设你的构造函数中有十个可选参数， 那么调用该函数会非常不方便； 因此， 你需要重载这个构造函数， 新建几个只有较少参数的简化版。 但这些构造函数仍需调用主构造函数， 传递一些默认数值来替代省略掉的参数。生成器模式让你可以分步骤生成对象， 而且允许你仅使用必须的步骤。 应用该模式后， 你再也不需要将几十个参数塞进构造函数里了。

2. 当你希望使用代码创建不同形式的产品时， 可使用生成器模式。

    1. 如果你需要创建的各种形式的产品， 它们的制造过程相似且仅有细节上的差异， 此时可使用生成器模式。
    2. 基本生成器接口中定义了所有可能的制造步骤， 具体生成器将实现这些步骤来制造特定形式的产品。 同时， 主管类将负责管理制造步骤的顺序。

3. 使用生成器构造组合树或其他复杂对象。

    1. 生成器模式让你能分步骤构造产品。 你可以延迟执行某些步骤而不会影响最终产品。 你甚至可以递归调用这些步骤， 这在创建对象树时非常方便。
    2. 生成器在执行制造步骤时， 不能对外发布未完成的产品。 这可以避免客户端代码获取到不完整结果对象的情况。

## 优缺点

### 优点

1. 你可以分步创建对象， 暂缓创建步骤或递归运行创建步骤。
2. 生成不同形式的产品时， 你可以复用相同的制造代码。
3. 单一职责原则。 你可以将复杂构造代码从产品的业务逻辑中分离出来。

### 缺点

1. 由于该模式需要新增多个类， 因此代码整体复杂程度会有所增加。

## 与其他模式的关系

1. 在许多设计工作的初期都会使用工厂方法模式 （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用抽象工厂模式、 原型模式或生成器模式 （更灵活但更加复杂）。
2. 生成器重点关注如何分步生成复杂对象。 抽象工厂专门用于生产一系列相关对象。 抽象工厂会马上返回产品， 生成器则允许你在获取产品前执行一些额外构造步骤。
3. 你可以在创建复杂组合模式树时使用生成器， 因为这可使其构造步骤以递归的方式运行。
4. 你可以结合使用生成器和桥接模式： 主管类负责抽象工作， 各种不同的生成器负责实现工作。
5. 抽象工厂、 生成器和原型都可以用单例模式来实现。

## 代码实现

```typescript
interface Builder {
	producePartA(): void;
	producePartB(): void;
	producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
	private product: Product1;

	constructor() {
		this.reset();
	}

	public reset(): void {
		this.product = new Product1();
	}

	public producePartA(): void {
		this.product.parts.push('PartA1');
	}

	public producePartB(): void {
		this.product.parts.push('PartB1');
	}

	public producePartC(): void {
		this.product.parts.push('PartC1');
	}

	public getProduct(): Product1 {
		const result = this.product;
		this.reset();
		return result;
	}
}

class Product1 {
	public parts: string[] = [];

	public listParts(): string {
		return `Product parts: ${this.parts.join(', ')}`;
	}
}

class Director {
	private builder: Builder;

	public setBuilder(builder: Builder): void {
		this.builder = builder;
	}

	public buildMinimalViableProduct(): void {
		this.builder.producePartA();
	}

	public buildFullFeaturedProduct(): void {
		this.builder.producePartA();
		this.builder.producePartB();
		this.builder.producePartC();
	}
}

export { Builder, ConcreteBuilder1, Product1, Director };
```

## 测试用例

```typescript
import { Director, ConcreteBuilder1 } from '../index';

describe('builder pattern', () => {
	it('builder  concrete creator 1', () => {
		const director = new Director();
		const builder = new ConcreteBuilder1();

		director.setBuilder(builder);

		director.buildMinimalViableProduct();
		expect(builder.getProduct().listParts()).toBe('Product parts: PartA1');

		director.buildFullFeaturedProduct();

		expect(builder.getProduct().listParts()).toBe('Product parts: PartA1, PartB1, PartC1');

		builder.producePartA();
		builder.producePartC();
		expect(builder.getProduct().listParts()).toBe('Product parts: PartA1, PartC1');
	});
});
```
