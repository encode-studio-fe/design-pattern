---
title: 代理模式
categories:
    - 设计模式
    - 结构型模式
tags:
    - 设计模式
author:
    name: 澄怀
    link: https://github.com/encode-studio-fe/design-pattern
---

# 代理模式

:::tip

**代理模式**是一种结构型设计模式， 让你能够提供对象的替代品或其占位符。 代理控制着对于原对象的访问， 并允许在将请求提交给对象前后进行一些处理。
:::

## 结构

![proxy_structure](./proxy_structure.png)

1. 服务接口 （`Service Interface`） 声明了服务接口。 代理必须遵循该接口才能伪装成服务对象。
2. 服务 （`Service`） 类提供了一些实用的业务逻辑。
3. 代理 （`Proxy`） 类包含一个指向服务对象的引用成员变量。 代理完成其任务 （例如延迟初始化、 记录日志、 访问控制和缓存等） 后会将请求传递给服务对象。
4. 客户端 （`Client`） 能通过同一接口与服务或代理进行交互， 所以你可在一切需要服务对象的代码中使用代理。

## 适用场景

1. 延迟初始化 （虚拟代理）。 如果你有一个偶尔使用的重量级服务对象， 一直保持该对象运行会消耗系统资源时， 可使用代理模式。

    1. 你无需在程序启动时就创建该对象， 可将对象的初始化延迟到真正有需要的时候。

2. 访问控制 （保护代理）。 如果你只希望特定客户端使用服务对象， 这里的对象可以是操作系统中非常重要的部分， 而客户端则是各种已启动的程序 （包括恶意程序）， 此时可使用代理模式。

    1. 代理可仅在客户端凭据满足要求时将请求传递给服务对象。

3. 本地执行远程服务 （远程代理）。 适用于服务对象位于远程服务器上的情形。

4. 在这种情形中， 代理通过网络传递客户端请求， 负责处理所有与网络相关的复杂细节。

5. 记录日志请求 （日志记录代理）。 适用于当你需要保存对于服务对象的请求历史记录时。

    1. 代理可以在向服务传递请求前进行记录。

6. 缓存请求结果 （缓存代理）。 适用于需要缓存客户请求结果并对缓存生命周期进行管理时， 特别是当返回结果的体积非常大时。

    1. 代理可对重复请求所需的相同结果进行缓存， 还可使用请求参数作为索引缓存的键值。

7. 智能引用。 可在没有客户端使用某个重量级对象时立即销毁该对象。

    1. 代理会将所有获取了指向服务对象或其结果的客户端记录在案。 代理会时不时地遍历各个客户端， 检查它们是否仍在运行。 如果相应的客户端列表为空， 代理就会销毁该服务对象， 释放底层系统资源。

## 优缺点

### 优点

1. 你可以在客户端毫无察觉的情况下控制服务对象。
2. 如果客户端对服务对象的生命周期没有特殊要求， 你可以对生命周期进行管理。
3. 即使服务对象还未准备好或不存在， 代理也可以正常工作。
4. 开闭原则。 你可以在不对服务或客户端做出修改的情况下创建新代理。

### 缺点

1.代码可能会变得复杂， 因为需要新建许多类。 2. 服务响应可能会延迟。

## 与其他模式的关系

1. 适配器模式能为被封装对象提供不同的接口， 代理模式能为对象提供相同的接口， 装饰模式则能为对象提供加强的接口。
2. 外观模式与代理的相似之处在于它们都缓存了一个复杂实体并自行对其进行初始化。 代理与其服务对象遵循同一接口， 使得自己和服务对象可以互换， 在这一点上它与外观不同。
3. 装饰和代理有着相似的结构， 但是其意图却非常不同。 这两个模式的构建都基于组合原则， 也就是说一个对象应该将部分工作委派给另一个对象。 两者之间的不同之处在于代理通常自行管理其服务对象的生命周期， 而装饰的生成则总是由客户端进行控制。

## 代码实现

```typescript
interface Subject {
	request(): void;
}

class RealSubject implements Subject {
	public request(): string {
		return 'RealSubject: Handling request.';
	}
}

class ProxyPattern implements Subject {
	private realSubject: RealSubject;

	constructor(realSubject: RealSubject) {
		this.realSubject = realSubject;
	}

	public request() {
		if (this.checkAccess()) {
			this.logAccess();

			return this.realSubject.request();
		}
	}

	private checkAccess(): boolean {
		console.log('Proxy: Checking access prior to firing a real request.');

		return true;
	}

	private logAccess(): void {
		console.log('Proxy: Logging the time of request.');
	}
}

export { Subject, RealSubject, ProxyPattern };
```

## 测试用例

```typescript
import { RealSubject, ProxyPattern } from '../index';

describe('proxy pattern', () => {
	it('proxy concrete', () => {
		const realSubject = new RealSubject();
		const proxy = new ProxyPattern(realSubject);

		expect(realSubject.request()).toBe('RealSubject: Handling request.');
		expect(proxy.request()).toBe('RealSubject: Handling request.');
	});
});
```
