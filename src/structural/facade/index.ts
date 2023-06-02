class Facade {
	protected subsystem1: Subsystem1;

	protected subsystem2: Subsystem2;

	constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
		this.subsystem1 = subsystem1 || new Subsystem1();
		this.subsystem2 = subsystem2 || new Subsystem2();
	}

	public operation(): string[] {
		let result: string[] = [];
		result.push(this.subsystem1.operation1());
		result.push(this.subsystem2.operation1());
		result.push(this.subsystem1.operationN());
		result.push(this.subsystem2.operationZ());

		return result;
	}
}

class Subsystem1 {
	public operation1(): string {
		return 'Subsystem1: Ready!';
	}

	public operationN(): string {
		return 'Subsystem1: Go!';
	}
}

class Subsystem2 {
	public operation1(): string {
		return 'Subsystem2: Get ready!';
	}

	public operationZ(): string {
		return 'Subsystem2: Fire!';
	}
}

export { Facade, Subsystem1, Subsystem2 };
