import { WordsCollection } from '../index';

describe('iterator pattern', () => {
	it('iterator concrete creator', () => {
		let str = '';

		const collection = new WordsCollection();
		collection.addItem('First');
		collection.addItem('Second');
		collection.addItem('Third');

		const iterator = collection.getIterator();

		while (iterator.valid()) {
			str += `${iterator.next()} `;
		}

		const reverseIterator = collection.getReverseIterator();
		while (reverseIterator.valid()) {
			str += `${reverseIterator.next()} `;
		}
		expect(str).toBe('First Second Third Third Second First ');
	});
});
