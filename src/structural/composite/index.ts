abstract class CompositeComponent {
	protected parent!: CompositeComponent | null;

	public setParent(parent: CompositeComponent | null) {
		this.parent = parent;
	}

	public getParent(): CompositeComponent | null {
		return this.parent;
	}

	public add(component: CompositeComponent): void {}

	public remove(component: CompositeComponent): void {}

	public isComposite(): boolean {
		return false;
	}

	public abstract operation(): string;
}

class Leaf extends CompositeComponent {
	public operation(): string {
		return 'Leaf';
	}
}

class Composite extends CompositeComponent {
	protected children: CompositeComponent[] = [];

	public add(component: CompositeComponent): void {
		this.children.push(component);
		component.setParent(this);
	}

	public remove(component: CompositeComponent): void {
		const componentIndex = this.children.indexOf(component);
		this.children.splice(componentIndex, 1);

		component.setParent(null);
	}

	public isComposite(): boolean {
		return true;
	}

	public operation(): string {
		const results: Array<string> = [];
		for (const child of this.children) {
			results.push(child.operation());
		}

		return `Branch(${results.join('+')})`;
	}
}

export { CompositeComponent, Leaf, Composite };
