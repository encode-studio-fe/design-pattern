import { Component1, Component2, ConcreteMediator } from '../index';

describe('mediator pattern', () => {
	it('mediator concrete creator', () => {
		const c1 = new Component1();
		const c2 = new Component2();
		const mediator = new ConcreteMediator(c1, c2);

		expect(c1.doA()).toBe('component 1 does A ');
		expect(c2.doD()).toBe('component 2 does D ');
	});
});
