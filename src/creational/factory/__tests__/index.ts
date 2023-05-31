import { ConcreteCreator1, ConcreteCreator2 } from '../index';

describe('factory pattern', () => {
	it('factory concrete creator 1', () => {
		const creator1 = new ConcreteCreator1();

		expect(creator1.someOperation()).toBe(
			"Creator: The same creator's code has just worked with ConcreteProduct1"
		);
	});
	it('factory concrete creator 2', () => {
		const creator1 = new ConcreteCreator2();

		expect(creator1.someOperation()).toBe(
			"Creator: The same creator's code has just worked with ConcreteProduct2"
		);
	});
});
