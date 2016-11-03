const {assert} = require('chai');
const range = require('./range');

describe('range', () => {
	it('returns an array containing all numbers from start up to end', () => {
		var arr = range(3, 6);

		assert.deepEqual(arr, [3, 4, 5]);
	});
});