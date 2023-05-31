import { Director, ConcreteBuilder1 } from '../index';

describe('builder pattern', () => {
	it('builder concrete', () => {
		const director = new Director();
		const builder = new ConcreteBuilder1();

		director.setBuilder(builder);

		director.buildMinimalViableProduct();
		expect(builder.getProduct().listParts()).toBe('Product parts: PartA1');

		director.buildFullFeaturedProduct();

		expect(builder.getProduct().listParts()).toBe('Product parts: PartA1, PartB1, PartC1');

		builder.producePartA();
		builder.producePartC();
		expect(builder.getProduct().listParts()).toBe('Product parts: PartA1, PartC1');
	});
});
