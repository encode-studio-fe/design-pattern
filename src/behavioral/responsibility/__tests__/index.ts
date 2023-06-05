import { MonkeyHandler, SquirrelHandler, DogHandler } from '../index';

describe('responsibility pattern', () => {
	it('responsibility concrete creator', () => {
		const list = [] as string[];
		const monkey = new MonkeyHandler();
		const squirrel = new SquirrelHandler();
		const dog = new DogHandler();

		monkey.setNext(squirrel).setNext(dog);

		const foods = ['Nut', 'Banana', 'Cup of coffee'];

		for (const food of foods) {
			const result = monkey.handle(food);
			if (result) {
				list.push(result);
			}
		}
		expect(list).toStrictEqual(['Nut', 'Banana']);
	});
});
