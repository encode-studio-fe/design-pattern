import { RealSubject, ProxyPattern } from '../index';

describe('proxy pattern', () => {
	it('proxy concrete', () => {
		const realSubject = new RealSubject();
		const proxy = new ProxyPattern(realSubject);

		expect(realSubject.request()).toBe('RealSubject: Handling request.');
		expect(proxy.request()).toBe('RealSubject: Handling request.');
	});
});
