function* periodicSequenceGenerator(period) {
	let i = 0;

	while (true) { // eslint-disable-line no-constant-condition
		yield i;
		i++;
		if (i === period) {
			i = 0;
		}
	}
}

module.exports = periodicSequenceGenerator;
