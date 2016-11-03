const {create, changeNumberOfCols} = require('./score');

describe('model/score', () => {
	describe('create', () => {
		describe('creates a score model', () => {
			property('with same number of rows as config', 'nat', numberOfCols => {
				const model = create(numberOfCols);

				assert.lengthOf(model.tones, numberOfCols);
			});

			property('with an availableTones array', 'nat', numberOfCols => {
				const model = create(numberOfCols);

				assert.deepEqual(model.availableTones, ['c', 'd', 'e', 'f', 'g', 'a', 'b']);
			});
		});
	});

	describe('changeNumberOfCols', () => {
		property('changes the number of cols', 'nat', 'nat', (numberOfCols, newNumberOfCols) => {
			const model = create(numberOfCols);
			const newModel = changeNumberOfCols(model, newNumberOfCols);

			assert.lengthOf(newModel.tones, newNumberOfCols);
		});
	});
});