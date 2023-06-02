---
title: 享元模式
categories:
    - 设计模式
    - 结构型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 享元模式

:::tip

**享元模式**是一种结构型设计模式， 它摒弃了在每个对象中保存所有数据的方式， 通过共享多个对象所共有的相同状态， 让你能在有限的内存容量中载入更多对象。
:::

## 结构

![flyweight_structure](./flyweight_structure.png)

1. 享元模式只是一种优化。 在应用该模式之前， 你要确定程序中存在与大量类似对象同时占用内存相关的内存消耗问题， 并且确保该问题无法使用其他更好的方式来解决。
2. 享元 （`Flyweight`） 类包含原始对象中部分能在多个对象中共享的状态。 同一享元对象可在许多不同情景中使用。 享元中存储的状态被称为 “内在状态”。 传递给享元方法的状态被称为 “外在状态”。
3. 情景 （`Context`） 类包含原始对象中各不相同的外在状态。 情景与享元对象组合在一起就能表示原始对象的全部状态。
4. 通常情况下， 原始对象的行为会保留在享元类中。 因此调用享元方法必须提供部分外在状态作为参数。 但你也可将行为移动到情景类中， 然后将连入的享元作为单纯的数据对象。
5. 客户端 （`Client`） 负责计算或存储享元的外在状态。 在客户端看来， 享元是一种可在运行时进行配置的模板对象， 具体的配置方式为向其方法中传入一些情景数据参数。
6. 享元工厂 （`Flyweight Factory`） 会对已有享元的缓存池进行管理。 有了工厂后， 客户端就无需直接创建享元， 它们只需调用工厂并向其传递目标享元的一些内在状态即可。 工厂会根据参数在之前已创建的享元中进行查找， 如果找到满足条件的享元就将其返回； 如果没有找到就根据参数新建享元。

## 适用场景

1. 仅在程序必须支持大量对象且没有足够的内存容量时使用享元模式。

    1. 应用该模式所获的收益大小取决于使用它的方式和情景。 它在下列情况中最有效：
        1. 程序需要生成数量巨大的相似对象
        2. 这将耗尽目标设备的所有内存
        3. 对象中包含可抽取且能在多个对象间共享的重复状态。

## 优缺点

### 优点

1. 如果程序中有很多相似对象， 那么你将可以节省大量内存。

### 缺点

1. 你可能需要牺牲执行速度来换取内存， 因为他人每次调用享元方法时都需要重新计算部分情景数据。
2. 代码会变得更加复杂。 团队中的新成员总是会问： ​ “为什么要像这样拆分一个实体的状态？”。

## 与其他模式的关系

1. 你可以使用享元模式实现组合模式树的共享叶节点以节省内存。
2. 享元展示了如何生成大量的小型对象， 外观模式则展示了如何用一个对象来代表整个子系统。
3. 如果你能将对象的所有共享状态简化为一个享元对象， 那么享元就和单例模式类似了。 但这两个模式有两个根本性的不同。
    1. 只会有一个单例实体， 但是享元类可以有多个实体， 各实体的内在状态也可以不同。
    2. 单例对象可以是可变的。 享元对象是不可变的。

## 代码实现

```typescript
class Flyweight {
	private sharedState: any;

	constructor(sharedState: any) {
		this.sharedState = sharedState;
	}

	public operation(uniqueState): { shared: Array<string>; unique: Array<string> } {
		const s = this.sharedState;
		const u = uniqueState;
		return {
			shared: s,
			unique: u,
		};
	}
}

class FlyweightFactory {
	private flyweights: { [key: string]: Flyweight } = <any>{};

	constructor(initialFlyweights: string[][]) {
		for (const state of initialFlyweights) {
			this.flyweights[this.getKey(state)] = new Flyweight(state);
		}
	}

	private getKey(state: string[]): string {
		return state.join('_');
	}

	public getFlyweight(sharedState: string[]): Flyweight {
		const key = this.getKey(sharedState);

		if (!(key in this.flyweights)) {
			console.log("FlyweightFactory: Can't find a flyweight, creating new one.");
			this.flyweights[key] = new Flyweight(sharedState);
		} else {
			console.log('FlyweightFactory: Reusing existing flyweight.');
		}

		return this.flyweights[key];
	}

	public listFlyweights(): void {
		const count = Object.keys(this.flyweights).length;
		console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
		for (const key in this.flyweights) {
			console.log(key);
		}
	}
}

const factory = new FlyweightFactory([
	['chenghuai', 'Camaro2018', 'pink'],
	['huaicheng', 'C300', 'black'],
	['xianzao', 'C500', 'red'],
	['BMW', 'M5', 'red'],
	['BMW', 'X6', 'white'],
]);

factory.listFlyweights();

export { Flyweight, FlyweightFactory, factory };
```

## 测试用例

```typescript
import { factory } from '../index';

describe('flyweight pattern', () => {
	it('flyweight concrete', () => {
		const flyweight1 = factory.getFlyweight(['BMW', 'M5', 'red']);
		const flyweight2 = factory.getFlyweight(['BMW', 'X1', 'red']);

		expect(flyweight1.operation(['CL234IR', 'James'])).toStrictEqual({
			shared: ['BMW', 'M5', 'red'],
			unique: ['CL234IR', 'James'],
		});

		expect(flyweight2.operation(['CL234IR', 'James'])).toStrictEqual({
			shared: ['BMW', 'X1', 'red'],
			unique: ['CL234IR', 'James'],
		});
	});
});
```
