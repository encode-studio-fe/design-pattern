import { Subsystem1, Subsystem2, Facade } from '../index';

describe('facade pattern', () => {
	it('facade concrete', () => {
		const subsystem1 = new Subsystem1();
		const subsystem2 = new Subsystem2();
		const facade = new Facade(subsystem1, subsystem2);

		expect(facade.operation()).toStrictEqual([
			'Subsystem1: Ready!',
			'Subsystem2: Get ready!',
			'Subsystem1: Go!',
			'Subsystem2: Fire!',
		]);
	});
});
