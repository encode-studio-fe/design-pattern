---
title: 组合模式
categories:
    - 设计模式
    - 结构型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 组合模式

:::tip

**组合模式**是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。
:::

## 结构

![composite_structure](./composite_structure.png)

1. 组件 （`Component`） 接口描述了树中简单项目和复杂项目所共有的操作。
2. 叶节点 （`Leaf`） 是树的基本结构， 它不包含子项目。
3. 容器 （`Container`）——又名 “组合 （Composite）”——是包含叶节点或其他容器等子项目的单位。 容器不知道其子项目所属的具体类， 它只通过通用的组件接口与其子项目交互。容器接收到请求后会将工作分配给自己的子项目， 处理中间结果， 然后将最终结果返回给客户端。
4. 客户端 （`Client`） 通过组件接口与所有项目交互。 因此， 客户端能以相同方式与树状结构中的简单或复杂项目交互。

## 适用场景

1. 如果你需要实现树状对象结构， 可以使用组合模式。

    1. 组合模式为你提供了两种共享公共接口的基本元素类型： 简单叶节点和复杂容器。 容器中可以包含叶节点和其他容器。 这使得你可以构建树状嵌套递归对象结构。

2. 如果你希望客户端代码以相同方式处理简单和复杂元素， 可以使用该模式。

    1. 组合模式中定义的所有元素共用同一个接口。 在这一接口的帮助下， 客户端不必在意其所使用的对象的具体类。

## 优缺点

### 优点

1. 你可以利用多态和递归机制更方便地使用复杂树结构。
2. 开闭原则。 无需更改现有代码， 你就可以在应用中添加新元素， 使其成为对象树的一部分。

### 缺点

1. 对于功能差异较大的类， 提供公共接口或许会有困难。 在特定情况下， 你需要过度一般化组件接口， 使其变得令人难以理解。

## 与其他模式的关系

1. 桥接模式、 状态模式和策略模式 （在某种程度上包括适配器模式） 模式的接口非常相似。 实际上， 它们都基于组合模式——即将工作委派给其他对象， 不过也各自解决了不同的问题。 模式并不只是以特定方式组织代码的配方， 你还可以使用它们来和其他开发者讨论模式所解决的问题。
2. 你可以在创建复杂组合树时使用生成器模式， 因为这可使其构造步骤以递归的方式运行。
3. 责任链模式通常和组合模式结合使用。 在这种情况下， 叶组件接收到请求后， 可以将请求沿包含全体父组件的链一直传递至对象树的底部。
4. 你可以使用迭代器模式来遍历组合树。
5. 你可以使用访问者模式对整个组合树执行操作。
6. 你可以使用享元模式实现组合树的共享叶节点以节省内存。
7. 组合和装饰模式的结构图很相似， 因为两者都依赖递归组合来组织无限数量的对象。
8. 装饰类似于组合， 但其只有一个子组件。 此外还有一个明显不同： 装饰为被封装对象添加了额外的职责， 组合仅对其子节点的结果进行了 “求和”。

## 代码实现

```typescript
abstract class CompositeComponent {
	protected parent!: CompositeComponent | null;

	public setParent(parent: CompositeComponent | null) {
		this.parent = parent;
	}

	public getParent(): CompositeComponent | null {
		return this.parent;
	}

	public add(component: CompositeComponent): void {}

	public remove(component: CompositeComponent): void {}

	public isComposite(): boolean {
		return false;
	}

	public abstract operation(): string;
}

class Leaf extends CompositeComponent {
	public operation(): string {
		return 'Leaf';
	}
}

class Composite extends CompositeComponent {
	protected children: CompositeComponent[] = [];

	public add(component: CompositeComponent): void {
		this.children.push(component);
		component.setParent(this);
	}

	public remove(component: CompositeComponent): void {
		const componentIndex = this.children.indexOf(component);
		this.children.splice(componentIndex, 1);

		component.setParent(null);
	}

	public isComposite(): boolean {
		return true;
	}

	public operation(): string {
		const results: Array<string> = [];
		for (const child of this.children) {
			results.push(child.operation());
		}

		return `Branch(${results.join('+')})`;
	}
}

export { CompositeComponent, Leaf, Composite };
```

## 测试用例

```typescript
import { Leaf, Composite } from '../index';

describe('composite pattern', () => {
	it('composite concrete 1', () => {
		const simple = new Leaf();

		expect(simple.operation()).toBe('Leaf');
	});

	it('composite concrete 2', () => {
		const tree = new Composite();
		const branch1 = new Composite();

		branch1.add(new Leaf());
		branch1.add(new Leaf());

		const branch2 = new Composite();
		branch2.add(new Leaf());

		tree.add(branch1);
		tree.add(branch2);

		expect(tree.operation()).toBe('Branch(Branch(Leaf+Leaf)+Branch(Leaf))');
	});
});
```
