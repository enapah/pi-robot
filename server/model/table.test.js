const jsverify = require('jsverify');

const {create, changeNumberOfCols} = require('./table');

const arbConfig = jsverify.array(jsverify.record({
	part: jsverify.asciistring,
	color: jsverify.asciistring,
	pin: jsverify.nat
}));

describe('model/table', () => {
	describe('create', () => {
		describe('creates a table model', () => {
			property('with same number of rows as config', arbConfig, 'nat', (config, numberOfCols) => {
				var model = create(config, numberOfCols);

				assert.lengthOf(model.rows, config.length);
			});

			property('each row has length numberOfCols', arbConfig, 'nat', (config, numberOfCols) => {
				var model = create(config, numberOfCols);

				model.rows.forEach(row => {
					assert.lengthOf(row.cells, numberOfCols);
				});
			});
		});
	});

	describe('changeNumberOfCols', () => {
		property('changes the number of cols', arbConfig, 'nat', 'nat', (config, numberOfCols, newNumberOfCols) => {
			const model = create(config, numberOfCols);
			const newModel = changeNumberOfCols(model, newNumberOfCols);

			newModel.rows.forEach(row => {
				assert.lengthOf(row.cells, newNumberOfCols);
			});

			assert.equal(newModel.numberOfCols, newNumberOfCols);
		});
	});
});