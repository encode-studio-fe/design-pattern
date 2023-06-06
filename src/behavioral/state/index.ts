class Context {
	private state: State;

	constructor(state: State) {
		this.transitionTo(state);
	}

	public transitionTo(state: State): void {
		this.state = state;
		this.state.setContext(this);
	}

	public request1(): void {
		this.state.handle1();
	}

	public request2(): string {
		return this.state.handle2();
	}
}

abstract class State {
	protected context: Context;

	public setContext(context: Context) {
		this.context = context;
	}

	public abstract handle1(): void;

	public abstract handle2(): string;
}

class ConcreteStateA extends State {
	public handle1(): void {
		this.context.transitionTo(new ConcreteStateB());
	}

	public handle2(): string {
		return 'ConcreteStateA handles request2.';
	}
}

class ConcreteStateB extends State {
	public handle1(): void {
		console.log('ConcreteStateB handles request1.');
	}

	public handle2(): string {
		this.context.transitionTo(new ConcreteStateA());
		return 'ConcreteStateB handles request2.';
	}
}
export { Context, State, ConcreteStateA, ConcreteStateB };
