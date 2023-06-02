interface DecorateComponent {
	operation(): string;
}

class ConcreteComponent implements DecorateComponent {
	public operation(): string {
		return 'ConcreteComponent';
	}
}

class Decorator implements DecorateComponent {
	protected component: DecorateComponent;

	constructor(component: DecorateComponent) {
		this.component = component;
	}

	public operation(): string {
		return this.component.operation();
	}
}

class ConcreteDecoratorA extends Decorator {
	public operation(): string {
		return `ConcreteDecoratorA(${super.operation()})`;
	}
}

class ConcreteDecoratorB extends Decorator {
	public operation(): string {
		return `ConcreteDecoratorB(${super.operation()})`;
	}
}

export { DecorateComponent, ConcreteComponent, Decorator, ConcreteDecoratorA, ConcreteDecoratorB };
