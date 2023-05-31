import { Singleton } from '../index';

describe('singleton pattern', () => {
	it('singleton instance', () => {
		const s1 = Singleton.getInstance();
		const s2 = Singleton.getInstance();

		expect(s1 === s2).toBe(true);
	});
});
