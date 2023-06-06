import { StrategyContext, ConcreteStrategyA, ConcreteStrategyB } from '../index';

describe('strategy pattern', () => {
	it('strategy concrete creator', () => {
		const context = new StrategyContext(new ConcreteStrategyA());
		expect(context.doSomeBusinessLogic()).toBe('a,b,c,d,e');

		context.setStrategy(new ConcreteStrategyB());
		expect(context.doSomeBusinessLogic()).toBe('e,d,c,b,a');
	});
});
