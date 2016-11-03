const range = require('./range');

const createCell = (x, y, pin) => ({
	x,
	y,
	pin,
	state: 'Off'
});

const createRow = ({part, color, pin}, y) => ({
	color,
	part,
	y,
	pin,
	cells: []
});

const create = (config, numberOfCols) =>
	growTable({
		rows: config.map(createRow),
		numberOfCols: 0
	}, numberOfCols);

const shrinkTable = (model, numberOfCols) => Object.assign({}, model, {
	rows: model.rows.map(row => Object.assign({}, row, {
		cells: row.cells.slice(0, numberOfCols)
	})),
	numberOfCols
});

const growTable = (model, numberOfCols) => Object.assign({}, model, {
	rows: model.rows.map(row => Object.assign({}, row, {
		cells: row.cells.concat(range(model.numberOfCols, numberOfCols).map(x => createCell(x, row.y, row.pin)))
	})),
	numberOfCols
});

const changeNumberOfCols = (model, numberOfCols) => {
	if (model.numberOfCols > numberOfCols) {
		return shrinkTable(model, numberOfCols);
	}
	if (model.numberOfCols < numberOfCols) {
		return growTable(model, numberOfCols);
	}
	return model;
};

module.exports = {
	create,
	changeNumberOfCols
};
