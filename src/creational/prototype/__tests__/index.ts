import { Prototype, ComponentWithBackReference } from '../index';

describe('prototype pattern', () => {
	it('prototype concrete creator', () => {
		const p1 = new Prototype();

		p1.primitive = 'chenghuai';
		p1.component = new Date();
		p1.circularReference = new ComponentWithBackReference(p1);

		const p2 = p1.clone();

		expect(p1.primitive === p2.primitive).toBe(true);
		expect(p1.component === p2.component).toBe(false);
		expect(p1.circularReference === p2.circularReference).toBe(false);
		expect(p1.circularReference.prototype === p2.circularReference.prototype).toBe(false);
	});
});
