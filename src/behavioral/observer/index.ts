interface ObserverSubject {
	attach(observer: Observer): void;
	detach(observer: Observer): void;
	notify(): void;
}

class ConcreteSubject implements ObserverSubject {
	public state: number;

	private observers: Observer[] = [];

	public attach(observer: Observer): string {
		const isExist = this.observers.includes(observer);
		if (isExist) {
			return 'Subject: Observer has been attached already.';
		}

		this.observers.push(observer);

		return '';
	}

	public detach(observer: Observer): string {
		const observerIndex = this.observers.indexOf(observer);
		if (observerIndex === -1) {
			return 'Subject: Nonexistent observer.';
		}

		this.observers.splice(observerIndex, 1);
		return '';
	}

	public notify(): string[] {
		let result = [] as string[];
		for (const observer of this.observers) {
			result.push(observer.update(this));
		}
		return result;
	}

	public someBusinessLogic(): string[] {
		return this.notify();
	}
}

interface Observer {
	update(subject: ObserverSubject): string;
}

class ConcreteObserverA implements Observer {
	public update(subject: ObserverSubject): string {
		return 'ConcreteObserverA: Reacted to the event.';
	}
}

class ConcreteObserverB implements Observer {
	public update(subject: ObserverSubject): string {
		return 'ConcreteObserverB: Reacted to the event.';
	}
}

export { ObserverSubject, ConcreteSubject, Observer, ConcreteObserverA, ConcreteObserverB };
