---
title: 原型模式
categories:
    - 设计模式
    - 创建型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 原型模式

:::tip

**原型模式**是一种创建型设计模式，能够复制已有对象， 而又无需使代码依赖它们所属的类。
:::

## 结构

### 基本实现

![prototype_structure_basic](./prototype_structure_basic.png)

1. 原型 （`Prototype`） 接口将对克隆方法进行声明。 在绝大多数情况下， 其中只会有一个名为 clone 克隆的方法。
2. 具体原型 （`Concrete Prototype`） 类将实现克隆方法。 除了将原始对象的数据复制到克隆体中之外， 该方法有时还需处理克隆过程中的极端情况， 例如克隆关联对象和梳理递归依赖等等。
3. 客户端 （`Client`） 可以复制实现了原型接口的任何对象。

### 原型注册表实现

![prototype_structure_registry](./prototype_structure_registry.png)

1. 原型注册表 （`Prototype Registry`） 提供了一种访问常用原型的简单方法， 其中存储了一系列可供随时复制的预生成对象。 最简单的注册表原型是一个 名称 → 原型的哈希表。 但如果需要使用名称以外的条件进行搜索， 你可以创建更加完善的注册表版本。

## 适用场景

1. 如果你需要复制一些对象， 同时又希望代码独立于这些对象所属的具体类， 可以使用原型模式。

    1. 这一点考量通常出现在代码需要处理第三方代码通过接口传递过来的对象时。 即使不考虑代码耦合的情况， 你的代码也不能依赖这些对象所属的具体类， 因为你不知道它们的具体信息。
    2. 原型模式为客户端代码提供一个通用接口， 客户端代码可通过这一接口与所有实现了克隆的对象进行交互， 它也使得客户端代码与其所克隆的对象具体类独立开来。

2. 如果子类的区别仅在于其对象的初始化方式， 那么你可以使用该模式来减少子类的数量。 别人创建这些子类的目的可能是为了创建特定类型的对象。

    1. 在原型模式中， 你可以使用一系列预生成的、 各种类型的对象作为原型。
    2. 客户端不必根据需求对子类进行实例化， 只需找到合适的原型并对其进行克隆即可。

## 优缺点

### 优点

1. 你可以克隆对象， 而无需与它们所属的具体类相耦合。
2. 你可以克隆预生成原型， 避免反复运行初始化代码。
3. 你可以更方便地生成复杂对象。
4. 你可以用继承以外的方式来处理复杂对象的不同配置。

### 缺点

1. 克隆包含循环引用的复杂对象可能会非常麻烦。

## 与其他模式的关系

1. 在许多设计工作的初期都会使用工厂方法模式 （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用抽象工厂模式、 原型模式或生成器模式 （更灵活但更加复杂）。
2. 抽象工厂模式通常基于一组工厂方法， 但你也可以使用原型模式来生成这些类的方法。
3. 原型可用于保存命令模式的历史记录。
4. 大量使用组合模式和装饰模式的设计通常可从对于原型的使用中获益。 你可以通过该模式来复制复杂结构， 而非从零开始重新构造。
5. 原型并不基于继承， 因此没有继承的缺点。 另一方面， 原型需要对被复制对象进行复杂的初始化。 工厂方法基于继承， 但是它不需要初始化步骤。
6. 有时候原型可以作为备忘录模式的一个简化版本， 其条件是你需要在历史记录中存储的对象的状态比较简单， 不需要链接其他外部资源， 或者链接可以方便地重建。
7. 抽象工厂、 生成器和原型都可以用单例模式来实现。

## 代码实现

```typescript
class Prototype {
	public primitive: any;
	public component: object;
	public circularReference: ComponentWithBackReference;

	public clone(): this {
		const clone = Object.create(this);

		clone.component = Object.create(this.component);

		clone.circularReference = {
			...this.circularReference,
			prototype: { ...this },
		};

		return clone;
	}
}

class ComponentWithBackReference {
	public prototype;

	constructor(prototype: Prototype) {
		this.prototype = prototype;
	}
}

export { Prototype, ComponentWithBackReference };
```

## 测试用例

```typescript
import { Prototype, ComponentWithBackReference } from '../index';

describe('prototype pattern', () => {
	it('prototype concrete creator', () => {
		const p1 = new Prototype();

		p1.primitive = 'chenghuai';
		p1.component = new Date();
		p1.circularReference = new ComponentWithBackReference(p1);

		const p2 = p1.clone();

		expect(p1.primitive === p2.primitive).toBe(true);
		expect(p1.component === p2.component).toBe(false);
		expect(p1.circularReference === p2.circularReference).toBe(false);
		expect(p1.circularReference.prototype === p2.circularReference.prototype).toBe(false);
	});
});
```
