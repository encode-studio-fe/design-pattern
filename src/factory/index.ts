interface Product {
	operation(): string;
}

abstract class Creator {
	public abstract factoryMethod(): Product;

	public someOperation(): string {
		const product = this.factoryMethod();

		return `Creator: The same creator's code has just worked with ${product.operation()}`;
	}
}

class ConcreteCreator1 extends Creator {
	public factoryMethod(): Product {
		return new ConcreteProduct1();
	}
}

class ConcreteCreator2 extends Creator {
	public factoryMethod(): Product {
		return new ConcreteProduct2();
	}
}

class ConcreteProduct1 implements Product {
	public operation(): string {
		return 'ConcreteProduct1';
	}
}

class ConcreteProduct2 implements Product {
	public operation(): string {
		return 'ConcreteProduct2';
	}
}

export { Product, Creator, ConcreteCreator1, ConcreteCreator2, ConcreteProduct1, ConcreteProduct2 };
