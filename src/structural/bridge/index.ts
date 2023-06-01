class Abstraction {
	protected implementation: Implementation;

	constructor(implementation: Implementation) {
		this.implementation = implementation;
	}

	public operation(): string {
		const result = this.implementation.operationImplementation();
		return result;
	}
}

class ExtendedAbstraction extends Abstraction {
	public operation(): string {
		const result = this.implementation.operationImplementation();
		return result;
	}
}

interface Implementation {
	operationImplementation(): string;
}

class ConcreteImplementationA implements Implementation {
	public operationImplementation(): string {
		return 'ConcreteImplementationA';
	}
}

class ConcreteImplementationB implements Implementation {
	public operationImplementation(): string {
		return 'ConcreteImplementationB';
	}
}

export {
	Abstraction,
	ExtendedAbstraction,
	Implementation,
	ConcreteImplementationA,
	ConcreteImplementationB,
};
