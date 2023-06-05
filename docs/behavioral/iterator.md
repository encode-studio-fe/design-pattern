---
title: 迭代器模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 迭代器模式

:::tip

**迭代器模式**是一种行为设计模式， 让你能在不暴露集合底层表现形式 （列表、 栈和树等） 的情况下遍历集合中所有的元素。
:::

## 结构

![iterator_structure](./iterator_structure.png)

1. 迭代器 （`Iterator`） 接口声明了遍历集合所需的操作： 获取下一个元素、 获取当前位置和重新开始迭代等。
2. 具体迭代器 （`Concrete Iterators`） 实现遍历集合的一种特定算法。 迭代器对象必须跟踪自身遍历的进度。 这使得多个迭代器可以相互独立地遍历同一集合。
3. 集合 （`Collection`） 接口声明一个或多个方法来获取与集合兼容的迭代器。 请注意， 返回方法的类型必须被声明为迭代器接口， 因此具体集合可以返回各种不同种类的迭代器。
4. 具体集合 （`Concrete Collections`） 会在客户端请求迭代器时返回一个特定的具体迭代器类实体。 你可能会琢磨， 剩下的集合代码在什么地方呢？ 不用担心， 它也会在同一个类中。 只是这些细节对于实际模式来说并不重要， 所以我们将其省略了而已。
5. 客户端 （`Client`） 通过集合和迭代器的接口与两者进行交互。 这样一来客户端无需与具体类进行耦合， 允许同一客户端代码使用各种不同的集合和迭代器。客户端通常不会自行创建迭代器， 而是会从集合中获取。 但在特定情况下， 客户端可以直接创建一个迭代器 （例如当客户端需要自定义特殊迭代器时）。

## 适用场景

1. 当集合背后为复杂的数据结构， 且你希望对客户端隐藏其复杂性时 （出于使用便利性或安全性的考虑）， 可以使用迭代器模式。

    1. 迭代器封装了与复杂数据结构进行交互的细节， 为客户端提供多个访问集合元素的简单方法。 这种方式不仅对客户端来说非常方便， 而且能避免客户端在直接与集合交互时执行错误或有害的操作， 从而起到保护集合的作用。

2. 使用该模式可以减少程序中重复的遍历代码。

    1. 重要迭代算法的代码往往体积非常庞大。 当这些代码被放置在程序业务逻辑中时， 它会让原始代码的职责模糊不清， 降低其可维护性。 因此， 将遍历代码移到特定的迭代器中可使程序代码更加精炼和简洁。

3. 如果你希望代码能够遍历不同的甚至是无法预知的数据结构， 可以使用迭代器模式。

    1. 该模式为集合和迭代器提供了一些通用接口。 如果你在代码中使用了这些接口， 那么将其他实现了这些接口的集合和迭代器传递给它时， 它仍将可以正常运行。

## 优缺点

### 优点

1. 单一职责原则。 通过将体积庞大的遍历算法代码抽取为独立的类， 你可对客户端代码和集合进行整理。
2. 开闭原则。 你可实现新型的集合和迭代器并将其传递给现有代码， 无需修改现有代码。
3. 你可以并行遍历同一集合， 因为每个迭代器对象都包含其自身的遍历状态。
4. 相似的， 你可以暂停遍历并在需要时继续。

### 缺点

1. 如果你的程序只与简单的集合进行交互， 应用该模式可能会矫枉过正。
2. 对于某些特殊集合， 使用迭代器可能比直接遍历的效率低。

## 与其他模式的关系

1. 你可以使用迭代器模式来遍历组合模式树。
2. 你可以同时使用工厂方法模式和迭代器来让子类集合返回不同类型的迭代器， 并使得迭代器与集合相匹配。
3. 你可以同时使用备忘录模式和迭代器来获取当前迭代器的状态， 并且在需要的时候进行回滚。
4. 可以同时使用访问者模式和迭代器来遍历复杂数据结构， 并对其中的元素执行所需操作， 即使这些元素所属的类完全不同。

## 代码实现

```typescript
interface Iterator<T> {
	current(): T;
	next(): T;
	key(): number;
	valid(): boolean;
	rewind(): void;
}

interface Aggregator {
	getIterator(): Iterator<string>;
}

class AlphabeticalOrderIterator implements Iterator<string> {
	private collection: WordsCollection;
	private position: number = 0;

	private reverse: boolean = false;

	constructor(collection: WordsCollection, reverse: boolean = false) {
		this.collection = collection;
		this.reverse = reverse;

		if (reverse) {
			this.position = collection.getCount() - 1;
		}
	}

	public rewind() {
		this.position = this.reverse ? this.collection.getCount() - 1 : 0;
	}

	public current(): string {
		return this.collection.getItems()[this.position];
	}

	public key(): number {
		return this.position;
	}

	public next() {
		const item = this.collection.getItems()[this.position];
		this.position += this.reverse ? -1 : 1;
		return item;
	}

	public valid(): boolean {
		if (this.reverse) {
			return this.position >= 0;
		}

		return this.position < this.collection.getCount();
	}
}

class WordsCollection implements Aggregator {
	private items: string[] = [];

	public getItems(): string[] {
		return this.items;
	}

	public getCount(): number {
		return this.items.length;
	}

	public addItem(item: string): void {
		this.items.push(item);
	}

	public getIterator(): Iterator<string> {
		return new AlphabeticalOrderIterator(this);
	}

	public getReverseIterator(): Iterator<string> {
		return new AlphabeticalOrderIterator(this, true);
	}
}

export { Iterator, Aggregator, AlphabeticalOrderIterator, WordsCollection };
```

## 测试用例

```typescript
import { WordsCollection } from '../index';

describe('iterator pattern', () => {
	it('iterator concrete creator', () => {
		let str = '';

		const collection = new WordsCollection();
		collection.addItem('First');
		collection.addItem('Second');
		collection.addItem('Third');

		const iterator = collection.getIterator();

		while (iterator.valid()) {
			str += `${iterator.next()} `;
		}

		const reverseIterator = collection.getReverseIterator();
		while (reverseIterator.valid()) {
			str += `${reverseIterator.next()} `;
		}
		expect(str).toBe('First Second Third Third Second First ');
	});
});
```
