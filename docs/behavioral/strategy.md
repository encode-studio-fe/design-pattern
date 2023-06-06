---
title: 策略模式
categories:
    - 设计模式
    - 行为模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 策略模式

:::tip

**策略模式**是一种行为设计模式， 它能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。
:::

## 结构

![strategy_structure](./strategy_structure.png)

1. 上下文 （`Context`） 维护指向具体策略的引用， 且仅通过策略接口与该对象进行交流。
2. 策略 （`Strategy`） 接口是所有具体策略的通用接口， 它声明了一个上下文用于执行策略的方法。
3. 具体策略 （`Concrete Strategies`） 实现了上下文所用算法的各种不同变体。
4. 当上下文需要运行算法时， 它会在其已连接的策略对象上调用执行方法。 上下文不清楚其所涉及的策略类型与算法的执行方式。
5. 客户端 （`Client`） 会创建一个特定策略对象并将其传递给上下文。 上下文则会提供一个设置器以便客户端在运行时替换相关联的策略。

## 适用场景

1. 当你想使用对象中各种不同的算法变体， 并希望能在运行时切换算法时， 可使用策略模式。

    1. 策略模式让你能够将对象关联至可以不同方式执行特定子任务的不同子对象， 从而以间接方式在运行时更改对象行为。

2. 当你有许多仅在执行某些行为时略有不同的相似类时， 可使用策略模式。

    1. 策略模式让你能将不同行为抽取到一个独立类层次结构中， 并将原始类组合成同一个， 从而减少重复代码。

3. 如果算法在上下文的逻辑中不是特别重要， 使用该模式能将类的业务逻辑与其算法实现细节隔离开来。

    1. 策略模式让你能将各种算法的代码、 内部数据和依赖关系与其他代码隔离开来。 不同客户端可通过一个简单接口执行算法， 并能在运行时进行切换。

4. 当类中使用了复杂条件运算符以在同一算法的不同变体中切换时， 可使用该模式。

    1. 策略模式将所有继承自同样接口的算法抽取到独立类中， 因此不再需要条件语句。 原始对象并不实现所有算法的变体， 而是将执行工作委派给其中的一个独立算法对象。

## 优缺点

### 优点

1. 可以在运行时切换对象内的算法。
2. 你可以将算法的实现和使用算法的代码隔离开来。
3. 你可以使用组合来代替继承。
4. 开闭原则。 你无需对上下文进行修改就能够引入新的策略。

### 缺点

1. 如果你的算法极少发生改变， 那么没有任何理由引入新的类和接口。 使用该模式只会让程序过于复杂。
2. 客户端必须知晓策略间的不同——它需要选择合适的策略。
3. 许多现代编程语言支持函数类型功能， 允许你在一组匿名函数中实现不同版本的算法。 这样， 你使用这些函数的方式就和使用策略对象时完全相同， 无需借助额外的类和接口来保持代码简洁。

## 与其他模式的关系

1. 桥接模式、 状态模式和策略模式 （在某种程度上包括适配器模式） 模式的接口非常相似。 实际上， 它们都基于组合模式——即将工作委派给其他对象， 不过也各自解决了不同的问题。 模式并不只是以特定方式组织代码的配方， 你还可以使用它们来和其他开发者讨论模式所解决的问题。
2. 命令模式和策略看上去很像， 因为两者都能通过某些行为来参数化对象。 但是， 它们的意图有非常大的不同。
    1. 你可以使用命令来将任何操作转换为对象。 操作的参数将成为对象的成员变量。 你可以通过转换来延迟操作的执行、 将操作放入队列、 保存历史命令或者向远程服务发送命令等。
    2. 另一方面， 策略通常可用于描述完成某件事的不同方式， 让你能够在同一个上下文类中切换算法。
3. 装饰模式可让你更改对象的外表， 策略则让你能够改变其本质。
4. 模板方法模式基于继承机制： 它允许你通过扩展子类中的部分内容来改变部分算法。 策略基于组合机制： 你可以通过对相应行为提供不同的策略来改变对象的部分行为。 模板方法在类层次上运作， 因此它是静态的。 策略在对象层次上运作， 因此允许在运行时切换行为。
5. 状态可被视为策略的扩展。 两者都基于组合机制： 它们都通过将部分工作委派给 “帮手” 对象来改变其在不同情景下的行为。 策略使得这些对象相互之间完全独立， 它们不知道其他对象的存在。 但状态模式没有限制具体状态之间的依赖， 且允许它们自行改变在不同情景下的状态。

## 代码实现

```typescript
class StrategyContext {
	private strategy: Strategy;

	constructor(strategy: Strategy) {
		this.strategy = strategy;
	}

	public setStrategy(strategy: Strategy) {
		this.strategy = strategy;
	}

	public doSomeBusinessLogic(): string {
		const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
		return result.join(',');
	}
}

interface Strategy {
	doAlgorithm(data: string[]): string[];
}

class ConcreteStrategyA implements Strategy {
	public doAlgorithm(data: string[]): string[] {
		return data.sort();
	}
}

class ConcreteStrategyB implements Strategy {
	public doAlgorithm(data: string[]): string[] {
		return data.reverse();
	}
}

export { StrategyContext, Strategy, ConcreteStrategyA, ConcreteStrategyB };
```

## 测试用例

```typescript
import { StrategyContext, ConcreteStrategyA, ConcreteStrategyB } from '../index';

describe('strategy pattern', () => {
	it('strategy concrete creator', () => {
		const context = new StrategyContext(new ConcreteStrategyA());
		expect(context.doSomeBusinessLogic()).toBe('a,b,c,d,e');

		context.setStrategy(new ConcreteStrategyB());
		expect(context.doSomeBusinessLogic()).toBe('e,d,c,b,a');
	});
});
```
