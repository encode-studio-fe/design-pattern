import { ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB } from '../index';

describe('decorate pattern', () => {
	it('simple component concrete 1', () => {
		const simple = new ConcreteComponent();

		expect(simple.operation()).toBe('ConcreteComponent');
	});

	it('decorated component concrete 2', () => {
		const simple = new ConcreteComponent();
		const decorator1 = new ConcreteDecoratorA(simple);
		const decorator2 = new ConcreteDecoratorB(decorator1);

		expect(decorator2.operation()).toBe(
			'ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))'
		);
	});
});
