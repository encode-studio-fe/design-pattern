import { Originator, Caretaker } from '../index';

describe('memento pattern', () => {
	it('memento concrete creator', () => {
		const originator = new Originator('Super-duper-super-puper-super.');
		const caretaker = new Caretaker(originator);

		caretaker.backup();
		const backUp1 = originator.doSomething();

		caretaker.backup();
		const backUp2 = originator.doSomething();

		caretaker.backup();

		caretaker.showHistory();

		expect(caretaker.undo()).toBe(backUp2);

		expect(caretaker.undo()).toBe(backUp1);
	});
});
