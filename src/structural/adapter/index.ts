class Target {
	public request(): string {
		return 'request';
	}
}

class Adaptee {
	public specificRequest(): string {
		return 'specify request';
	}
}

class Adapter extends Target {
	private adaptee: Adaptee;

	constructor(adaptee: Adaptee) {
		super();
		this.adaptee = adaptee;
	}

	public request(): string {
		const result = this.adaptee.specificRequest().split(' ').reverse().join(' ');
		return `Adapter: (TRANSLATED) ${result}`;
	}
}

export { Target, Adaptee, Adapter };
