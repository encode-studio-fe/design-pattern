interface VisitorComponent {
	accept(visitor: Visitor): void;
}

class ConcreteComponentA implements VisitorComponent {
	public accept(visitor: Visitor): string {
		return visitor.visitConcreteComponentA(this);
	}

	public exclusiveMethodOfConcreteComponentA(): string {
		return 'A';
	}
}

class ConcreteComponentB implements VisitorComponent {
	public accept(visitor: Visitor): string {
		return visitor.visitConcreteComponentB(this);
	}

	public specialMethodOfConcreteComponentB(): string {
		return 'B';
	}
}

interface Visitor {
	visitConcreteComponentA(element: ConcreteComponentA): string;

	visitConcreteComponentB(element: ConcreteComponentB): string;
}

class ConcreteVisitor1 implements Visitor {
	public visitConcreteComponentA(element: ConcreteComponentA): string {
		return `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`;
	}

	public visitConcreteComponentB(element: ConcreteComponentB): string {
		return `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`;
	}
}

class ConcreteVisitor2 implements Visitor {
	public visitConcreteComponentA(element: ConcreteComponentA): string {
		return `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`;
	}

	public visitConcreteComponentB(element: ConcreteComponentB): string {
		return `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`;
	}
}

export {
	VisitorComponent,
	ConcreteComponentA,
	ConcreteComponentB,
	Visitor,
	ConcreteVisitor1,
	ConcreteVisitor2,
};
