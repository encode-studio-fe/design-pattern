import {
	ConcreteVisitor1,
	ConcreteVisitor2,
	ConcreteComponentA,
	ConcreteComponentB,
} from '../index';

describe('template pattern', () => {
	it('template concrete creator', () => {
		const componentA = new ConcreteComponentA();
		const visitor1 = new ConcreteVisitor1();

		expect(componentA.accept(visitor1)).toBe('A + ConcreteVisitor1');

		const componentB = new ConcreteComponentB();
		const visitor2 = new ConcreteVisitor2();

		expect(componentB.accept(visitor2)).toBe('B + ConcreteVisitor2');
	});
});
