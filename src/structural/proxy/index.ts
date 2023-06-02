interface Subject {
	request(): void;
}

class RealSubject implements Subject {
	public request(): string {
		return 'RealSubject: Handling request.';
	}
}

class ProxyPattern implements Subject {
	private realSubject: RealSubject;

	constructor(realSubject: RealSubject) {
		this.realSubject = realSubject;
	}

	public request() {
		if (this.checkAccess()) {
			this.logAccess();

			return this.realSubject.request();
		}
	}

	private checkAccess(): boolean {
		console.log('Proxy: Checking access prior to firing a real request.');

		return true;
	}

	private logAccess(): void {
		console.log('Proxy: Logging the time of request.');
	}
}

export { Subject, RealSubject, ProxyPattern };
