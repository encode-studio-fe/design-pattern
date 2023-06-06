---
title: 模板方法模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 模板方法模式

:::tip

**模板方法模式**是一种行为设计模式， 它在超类中定义了一个算法的框架， 允许子类在不修改结构的情况下重写算法的特定步骤。
:::

## 结构

![template_structure](./template_structure.png)

1. 抽象类 （`Abstract­Class`） 会声明作为算法步骤的方法， 以及依次调用它们的实际模板方法。 算法步骤可以被声明为 抽象类型， 也可以提供一些默认实现。
2. 具体类 （`Concrete­Class`） 可以重写所有步骤， 但不能重写模板方法自身。

## 适用场景

1. 当你只希望客户端扩展某个特定算法步骤， 而不是整个算法或其结构时， 可使用模板方法模式。

    1. 模板方法将整个算法转换为一系列独立的步骤， 以便子类能对其进行扩展， 同时还可让超类中所定义的结构保持完整。

2. 当多个类的算法除一些细微不同之外几乎完全一样时， 你可使用该模式。 但其后果就是， 只要算法发生变化， 你就可能需要修改所有的类。

    1.在将算法转换为模板方法时， 你可将相似的实现步骤提取到超类中以去除重复代码。 子类间各不同的代码可继续保留在子类中。

## 优缺点

### 优点

1. 你可仅允许客户端重写一个大型算法中的特定部分， 使得算法其他部分修改对其所造成的影响减小。
2. 你可将重复代码提取到一个超类中。

### 缺点

1. 部分客户端可能会受到算法框架的限制。
2. 通过子类抑制默认步骤实现可能会导致违反里氏替换原则。
3. 模板方法中的步骤越多， 其维护工作就可能会越困难。

## 与其他模式的关系

1. 工厂方法模式是模板方法模式的一种特殊形式。 同时， 工厂方法可以作为一个大型模板方法中的一个步骤。
2. 模板方法基于继承机制： 它允许你通过扩展子类中的部分内容来改变部分算法。 策略模式基于组合机制： 你可以通过对相应行为提供不同的策略来改变对象的部分行为。 模板方法在类层次上运作， 因此它是静态的。 策略在对象层次上运作， 因此允许在运行时切换行为。

## 代码实现

```typescript
abstract class AbstractClass {
	public templateMethod(): string[] {
		this.baseOperation1();
		this.requiredOperations1();
		this.baseOperation2();
		this.hook1();
		this.requiredOperation2();
		this.baseOperation3();
		this.hook2();

		return [this.baseOperation1(), this.baseOperation2(), this.baseOperation3()];
	}

	protected baseOperation1(): string {
		return 'baseOperation1';
	}

	protected baseOperation2(): string {
		return 'baseOperation2';
	}

	protected baseOperation3(): string {
		return 'baseOperation3';
	}

	protected abstract requiredOperations1(): void;

	protected abstract requiredOperation2(): void;

	protected hook1(): void {}

	protected hook2(): void {}
}

class ConcreteClass1 extends AbstractClass {
	protected requiredOperations1(): string {
		return 'ConcreteClass1: Operation1';
	}

	protected requiredOperation2(): string {
		return 'ConcreteClass1: Operation2';
	}
}

class ConcreteClass2 extends AbstractClass {
	protected requiredOperations1(): string {
		return 'ConcreteClass2: Operation1';
	}

	protected requiredOperation2(): string {
		return 'ConcreteClass2: Operation2';
	}

	protected hook1(): string {
		return 'ConcreteClass2  Hook1';
	}
}

export { AbstractClass, ConcreteClass1, ConcreteClass2 };
```

## 测试用例

```typescript
import { ConcreteClass1 } from '../index';

describe('template pattern', () => {
	it('template concrete creator', () => {
		const concrete1 = new ConcreteClass1();
		expect(concrete1.templateMethod()).toStrictEqual([
			'baseOperation1',
			'baseOperation2',
			'baseOperation3',
		]);
	});
});
```
