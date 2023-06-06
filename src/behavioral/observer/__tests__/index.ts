import { ConcreteSubject, ConcreteObserverA, ConcreteObserverB } from '../index';

describe('observer pattern', () => {
	it('observer concrete creator', () => {
		const subject = new ConcreteSubject();

		const observer1 = new ConcreteObserverA();
		subject.attach(observer1);

		const observer2 = new ConcreteObserverB();
		subject.attach(observer2);

		expect(subject.someBusinessLogic()).toStrictEqual([
			'ConcreteObserverA: Reacted to the event.',
			'ConcreteObserverB: Reacted to the event.',
		]);
		expect(subject.someBusinessLogic()).toStrictEqual([
			'ConcreteObserverA: Reacted to the event.',
			'ConcreteObserverB: Reacted to the event.',
		]);

		subject.detach(observer2);

		expect(subject.someBusinessLogic()).toStrictEqual([
			'ConcreteObserverA: Reacted to the event.',
		]);
	});
});
