interface Builder {
	producePartA(): void;
	producePartB(): void;
	producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
	private product: Product1;

	constructor() {
		this.reset();
	}

	public reset(): void {
		this.product = new Product1();
	}

	public producePartA(): void {
		this.product.parts.push('PartA1');
	}

	public producePartB(): void {
		this.product.parts.push('PartB1');
	}

	public producePartC(): void {
		this.product.parts.push('PartC1');
	}

	public getProduct(): Product1 {
		const result = this.product;
		this.reset();
		return result;
	}
}

class Product1 {
	public parts: string[] = [];

	public listParts(): string {
		return `Product parts: ${this.parts.join(', ')}`;
	}
}

class Director {
	private builder: Builder;

	public setBuilder(builder: Builder): void {
		this.builder = builder;
	}

	public buildMinimalViableProduct(): void {
		this.builder.producePartA();
	}

	public buildFullFeaturedProduct(): void {
		this.builder.producePartA();
		this.builder.producePartB();
		this.builder.producePartC();
	}
}

export { Builder, ConcreteBuilder1, Product1, Director };
