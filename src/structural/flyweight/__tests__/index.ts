import { factory } from '../index';

describe('flyweight pattern', () => {
	it('flyweight concrete', () => {
		const flyweight1 = factory.getFlyweight(['BMW', 'M5', 'red']);
		const flyweight2 = factory.getFlyweight(['BMW', 'X1', 'red']);

		expect(flyweight1.operation(['CL234IR', 'James'])).toStrictEqual({
			shared: ['BMW', 'M5', 'red'],
			unique: ['CL234IR', 'James'],
		});

		expect(flyweight2.operation(['CL234IR', 'James'])).toStrictEqual({
			shared: ['BMW', 'X1', 'red'],
			unique: ['CL234IR', 'James'],
		});
	});
});
