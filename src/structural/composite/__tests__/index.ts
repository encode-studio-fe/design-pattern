import { Component, Leaf, Composite } from '../index';

describe('composite pattern', () => {
	it('composite concrete 1', () => {
		const simple = new Leaf();

		expect(simple.operation()).toBe('Leaf');
	});

	it('composite concrete 2', () => {
		const tree = new Composite();
		const branch1 = new Composite();

		branch1.add(new Leaf());
		branch1.add(new Leaf());

		const branch2 = new Composite();
		branch2.add(new Leaf());

		tree.add(branch1);
		tree.add(branch2);

		expect(tree.operation()).toBe('Branch(Branch(Leaf+Leaf)+Branch(Leaf))');
	});
});
