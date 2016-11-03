const createPeriodicIterator = require('./periodic-iterator');

const something = callback => {
	let iterator;

	return {
		start: (generator, delay) => {
			if (iterator) {
				iterator.stop();
			}
			iterator = createPeriodicIterator(generator, callback);
			iterator.start(delay);
		},
		get running() {
			return !!iterator;
		},
		stop: () => {
			if (iterator) {
				iterator.stop();
				iterator = null;
			}
		}
	};
};

module.exports = something;
