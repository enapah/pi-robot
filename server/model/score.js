const range = require('./range');

const availableTones = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

const randomTone = () => availableTones[Math.floor(Math.random() * availableTones.length)];

const create = (numberOfCols) =>
	growScore({
		tones: [],
		availableTones
	}, numberOfCols);

const shrinkScore = (score, numberOfCols) => Object.assign({}, score, {
	tones: score.tones.slice(0, numberOfCols)
});

const growScore = (score, numberOfCols) => Object.assign({}, score, {
	tones: score.tones.concat(range(score.tones.length, numberOfCols).map(randomTone))
});

const changeNumberOfCols = (score, numberOfCols) => {
	if (score.tones.length > numberOfCols) {
		return shrinkScore(score, numberOfCols);
	}
	if (score.tones.length < numberOfCols) {
		return growScore(score, numberOfCols);
	}
	return score;
};

module.exports = {
	create,
	changeNumberOfCols
};
