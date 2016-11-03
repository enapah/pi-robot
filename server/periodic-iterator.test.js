const sinon = require('sinon');
const periodicIterator = require('./periodic-iterator');

function* generator(...values) {
	for (let i = 0; i < values.length; i++) {
		yield values[i];
	}
}

describe('periodicIterator', () => {
	let clock;

	beforeEach(() => {
		clock = sinon.useFakeTimers();
	});

	afterEach(() => {
		clock.restore();
	});

	describe('when started with a given periodicity', () => {
		describe('and run for one period', () => {
			it('calls the callback once', () => {
				const callback = sinon.stub();

				const iterator = periodicIterator(generator(1, 2, 3), callback);
				iterator.start(5);

				clock.tick(5);
				sinon.assert.callCount(callback, 1);
			});
		});

		describe('and stopped before one period has passed', () => {
			it('does not call the callback', () => {
				const callback = sinon.stub();

				const iterator = periodicIterator(generator(1, 2, 3), callback);
				iterator.start(5);
				clock.tick(2);

				iterator.stop();

				clock.tick(3);
				sinon.assert.notCalled(callback);
			});
		});

		describe('and run for as many periods as the number of generated values', () => {
			it('calls the callback with each value', () => {
				const callback = sinon.stub();

				const iterator = periodicIterator(generator(1, 2, 3), callback);
				iterator.start(1);

				clock.tick(3);
				sinon.assert.calledWith(callback, 1);
				sinon.assert.calledWith(callback, 2);
				sinon.assert.calledWith(callback, 3);
			});
		});
	});
});
