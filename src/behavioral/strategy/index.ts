class StrategyContext {
	private strategy: Strategy;

	constructor(strategy: Strategy) {
		this.strategy = strategy;
	}

	public setStrategy(strategy: Strategy) {
		this.strategy = strategy;
	}

	public doSomeBusinessLogic(): string {
		const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
		return result.join(',');
	}
}

interface Strategy {
	doAlgorithm(data: string[]): string[];
}

class ConcreteStrategyA implements Strategy {
	public doAlgorithm(data: string[]): string[] {
		return data.sort();
	}
}

class ConcreteStrategyB implements Strategy {
	public doAlgorithm(data: string[]): string[] {
		return data.reverse();
	}
}

export { StrategyContext, Strategy, ConcreteStrategyA, ConcreteStrategyB };
