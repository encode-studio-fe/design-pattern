import { ConcreteImplementationA, ConcreteImplementationB, Abstraction } from '../index';

describe('bridge pattern', () => {
	it('bridge concrete A', () => {
		const implementationA = new ConcreteImplementationA();
		const abstractionA = new Abstraction(implementationA);

		expect(abstractionA.operation()).toBe('ConcreteImplementationA');
	});

	it('bridge concrete B', () => {
		const implementationB = new ConcreteImplementationB();
		const abstractionB = new Abstraction(implementationB);

		expect(abstractionB.operation()).toBe('ConcreteImplementationB');
	});
});
