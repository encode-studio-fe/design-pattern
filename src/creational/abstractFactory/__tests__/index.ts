import { ConcreteFactory1, ConcreteFactory2 } from '../index';

describe('abstract factory pattern', () => {
	it('abstract factory concrete creator 1', () => {
		const factory1 = new ConcreteFactory1();

		const productA = factory1.createProductA();
		const productB = factory1.createProductB();

		expect(productB.usefulFunctionB()).toBe('The result of the product B1.');
		expect(productB.anotherUsefulFunctionB(productA)).toBe(
			'The result of the B1 collaborating with the product A1.'
		);
	});

	it('abstract factory concrete creator 1', () => {
		const factory1 = new ConcreteFactory2();

		const productA = factory1.createProductA();
		const productB = factory1.createProductB();

		expect(productB.usefulFunctionB()).toBe('The result of the product B2.');
		expect(productB.anotherUsefulFunctionB(productA)).toBe(
			'The result of the B2 collaborating with the product A2.'
		);
	});
});
