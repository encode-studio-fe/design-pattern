interface AbstractFactory {
	createProductA(): AbstractProductA;

	createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new ConcreteProductA1();
	}

	public createProductB(): AbstractProductB {
		return new ConcreteProductB1();
	}
}

class ConcreteFactory2 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new ConcreteProductA2();
	}

	public createProductB(): AbstractProductB {
		return new ConcreteProductB2();
	}
}

interface AbstractProductA {
	usefulFunctionA(): string;
}

class ConcreteProductA1 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'the product A1.';
	}
}

class ConcreteProductA2 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'the product A2.';
	}
}

interface AbstractProductB {
	usefulFunctionB(): string;

	anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
	public usefulFunctionB(): string {
		return 'The result of the product B1.';
	}

	public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B1 collaborating with ${result}`;
	}
}

class ConcreteProductB2 implements AbstractProductB {
	public usefulFunctionB(): string {
		return 'The result of the product B2.';
	}

	public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B2 collaborating with ${result}`;
	}
}

export {
	AbstractFactory,
	ConcreteFactory1,
	ConcreteFactory2,
	AbstractProductA,
	ConcreteProductA1,
	ConcreteProductA2,
	AbstractProductB,
	ConcreteProductB2,
};
