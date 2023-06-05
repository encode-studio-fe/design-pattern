interface Handler {
	setNext(handler: Handler): Handler;

	handle(request: string): string;
}

abstract class AbstractHandler implements Handler {
	private nextHandler: Handler;

	public setNext(handler: Handler): Handler {
		this.nextHandler = handler;

		return handler;
	}

	public handle(request: string): string {
		if (this.nextHandler) {
			return this.nextHandler.handle(request);
		}

		return '';
	}
}

class MonkeyHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Banana') {
			return request
		}
		return super.handle(request);
	}
}

class SquirrelHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Nut') {
			return request;
		}
		return super.handle(request);
	}
}

class DogHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'MeatBall') {
			return request;
		}
		return super.handle(request);
	}
}

export { Handler, AbstractHandler, MonkeyHandler, SquirrelHandler, DogHandler };
