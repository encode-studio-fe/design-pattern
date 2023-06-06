import { ConcreteClass1 } from '../index';

describe('template pattern', () => {
	it('template concrete creator', () => {
		const concrete1 = new ConcreteClass1();
		expect(concrete1.templateMethod()).toStrictEqual([
			'baseOperation1',
			'baseOperation2',
			'baseOperation3',
		]);
	});
});
