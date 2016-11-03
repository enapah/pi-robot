/* eslint-disable no-console */

module.exports = {
	OUTPUT: 1,
	LOW: 0,
	HIGH: 1,
	init: () => {
		console.log('init');
	},
	open: pin => {
		console.log('open', pin);
	},
	close: pin => {
		console.log('close', pin);
	},
	write: () => {}
};
