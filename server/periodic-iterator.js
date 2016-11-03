const periodicIterator = (generator, callback) => {
	let intervalID;

	const tick = () => callback(generator.next().value);

	return {
		start: period => {
			intervalID = setInterval(tick, period);
		},
		stop: () => {
			if (intervalID) {
				clearInterval(intervalID);
				intervalID = undefined;
			}
		}
	};
};

module.exports = periodicIterator;
