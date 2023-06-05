class Originator {
	private state: string;

	constructor(state: string) {
		this.state = state;
	}

	public doSomething(): string {
		this.state = this.generateRandomString(30);
		return this.state;
	}

	private generateRandomString(length: number = 10): string {
		const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		return Array.apply(null, { length })
			.map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
			.join('');
	}

	public save(): Memento {
		return new ConcreteMemento(this.state);
	}

	public restore(memento: Memento): string {
		this.state = memento.getState();
		return this.state;
	}
}

interface Memento {
	getState(): string;

	getName(): string;

	getDate(): string;
}

class ConcreteMemento implements Memento {
	private state: string;

	private date: string;

	constructor(state: string) {
		this.state = state;
		this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	}

	public getState(): string {
		return this.state;
	}

	public getName(): string {
		return `${this.date} / (${this.state.substr(0, 9)}...)`;
	}

	public getDate(): string {
		return this.date;
	}
}

class Caretaker {
	private mementos: Memento[] = [];

	private originator: Originator;

	constructor(originator: Originator) {
		this.originator = originator;
	}

	public backup(): void {
		this.mementos.push(this.originator.save());
	}

	public undo(): string {
		if (!this.mementos.length) {
			return '';
		}
		const memento = this.mementos.pop();

		return this.originator.restore(memento!);
	}

	public showHistory(): void {
		for (const memento of this.mementos) {
			console.log(memento.getName());
		}
	}
}

export { Originator, Memento, ConcreteMemento, Caretaker };
