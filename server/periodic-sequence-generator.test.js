const jsverify = require('jsverify');

const periodicSequenceGenerator = require('./periodic-sequence-generator');

var pos = jsverify.nat.smap(x => x + 1, x => x - 1);

describe('periodicSequenceGenerator', () => {
	it('accepts one parameter', () => {
		assert.lengthOf(periodicSequenceGenerator, 1);
	});

	describe('when called with a length parameter it creates a sequence', () => {
		property('starting with zero', pos, length => {
			const iter = periodicSequenceGenerator(length);

			assert.equal(iter.next().value, 0);
		});

		property('ending with length - 1', pos, length => {
			const iter = periodicSequenceGenerator(length);

			let value = 0;

			for (let i = 0; i < length; i++) {
				value = iter.next().value;
			}

			assert.equal(value, length - 1);
		});

		property('of increasing numbers', pos, length => {
			const iter = periodicSequenceGenerator(length);

			let prev = -1;

			for (let i = 0; i < length; i++) {
				const value = iter.next().value;

				assert.isAbove(value, prev);

				prev = value;
			}
		});

		property('of given periodicity', pos, length => {
			const iter = periodicSequenceGenerator(length);

			const array = [];

			for (let i = 0; i < 2 * length; i++) {
				array.push(iter.next().value);
			}

			for (let i = 0; i < length; i++) {
				assert.equal(array[i], array[i + length]);
			}
		});
	});
});