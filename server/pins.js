const rpio = process.env.NODE_ENV === 'prod' ?
	require('rpio') :
	require('./fake-rpio');

module.exports = {
	init: () => {
		rpio.init({mapping: 'gpio'});

		const opened = [];

		return {
			openAsOutput: pin => {
				rpio.open(pin, rpio.OUTPUT);
				opened.push(pin);
			},
			closeAll: () => {
				opened.forEach(pin => rpio.close(pin));
			},
			write: (pin, state) => {
				rpio.write(pin, state === 'On' ? rpio.HIGH : rpio.LOW);
			}
		};
	}
};
