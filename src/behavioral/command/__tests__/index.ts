import { Invoker, Receiver, SimpleCommand, ComplexCommand } from '../index';

describe('command pattern', () => {
	it('command concrete creator', () => {
		const invoker = new Invoker();
		const receiver = new Receiver();

		invoker.setOnStart(new SimpleCommand('Say Hi!'));
		invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

		expect(invoker.doSomethingImportant()).toBe('SimpleCommand: Say Hi!');
		// expect(invoker.doSomethingImportant()).toBe('Send email Save report');
	});
});
