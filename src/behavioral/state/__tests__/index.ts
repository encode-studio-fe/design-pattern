import { Context, ConcreteStateA } from '../index';

describe('state pattern', () => {
	it('state concrete creator', () => {
		const context = new Context(new ConcreteStateA());
		context.request1();
		expect(context.request2()).toBe('ConcreteStateB handles request2.');
	});
});
