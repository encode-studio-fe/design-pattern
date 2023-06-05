interface Command {
	execute(): string;
}

class SimpleCommand implements Command {
	private payload: string;

	constructor(payload: string) {
		this.payload = payload;
	}

	public execute(): string {
		return `SimpleCommand: ${this.payload}`;
	}
}

class ComplexCommand implements Command {
	private receiver: Receiver;

	private a: string;

	private b: string;

	constructor(receiver: Receiver, a: string, b: string) {
		this.receiver = receiver;
		this.a = a;
		this.b = b;
	}

	public execute(): string {
		return this.receiver.doSomething(this.a) + ' ' + this.receiver.doSomethingElse(this.b);
	}
}

class Receiver {
	public doSomething(a: string): string {
		return a;
	}

	public doSomethingElse(b: string): string {
		return b;
	}
}

class Invoker {
	private onStart: Command;

	private onFinish: Command;

	public setOnStart(command: Command): void {
		this.onStart = command;
	}

	public setOnFinish(command: Command): void {
		this.onFinish = command;
	}

	public doSomethingImportant() {
		if (this.isCommand(this.onStart)) {
			return this.onStart.execute();
		}

		// if (this.isCommand(this.onFinish)) {
		// 	return this.onFinish.execute();
		// }
	}

	private isCommand(object): object is Command {
		return object.execute !== undefined;
	}
}

export { Command, SimpleCommand, ComplexCommand, Receiver, Invoker };
