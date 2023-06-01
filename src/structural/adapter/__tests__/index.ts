import { Adaptee, Adapter, Target } from '../index';

describe('adapter pattern', () => {
	it('adapter concrete', () => {
		const target = new Target();
		const adaptee = new Adaptee();
		const adapter = new Adapter(adaptee);

		expect(adaptee.specificRequest()).toBe('specify request');
		expect(adapter.request()).toBe('Adapter: (TRANSLATED) request specify');
	});
});
