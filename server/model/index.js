const tableModel = require('./table'),
	scoreModel = require('./score');

module.exports = {
	createStore: config => {
		let state = {
			table: tableModel.create(config, 10),
			score: scoreModel.create(10),
			delay: 200,
			numberOfCols: 10
		};

		return {
			get state() {
				return Object.assign({}, state);
			},
			changeNumberOfCols: numberOfCols => {
				state = {
					numberOfCols,
					table: tableModel.changeNumberOfCols(state.table, numberOfCols),
					score: scoreModel.changeNumberOfCols(state.score, numberOfCols),
					delay: state.delay
				};
				return state;
			},

			changeDelay: delay => {
				state = Object.assign({}, state, {delay});
				return state;
			},
			changeCell: (x, y, cellState) => {
				state.table.rows[y].cells[x].state = cellState;
				return state;
			}
		};
	},
};
