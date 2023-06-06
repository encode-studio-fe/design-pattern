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
