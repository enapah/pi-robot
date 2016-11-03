const startServer = require('./server'),
	pins = require('./pins').init(),
	something = require('./something'),
	{createStore} = require('./model/index'),
	config = require('./pin-config.json');

const numberGenerator = require('./periodic-sequence-generator');

config.forEach(({pin}) => pins.openAsOutput(pin));

const store = createStore(config);

const server = startServer(8080, {
	onConnection: sendClient => {
		const {table, score, delay} = store.state;

		sendClient(table);
		sendClient(score);
		sendClient({delay});
		sendClient({playing: s.running});
	},
	onMessage: (message, sendClient, broadcastOthers, broadcastAll) => {
		if (message.numberOfCols) {
			const {table, score} = store.changeNumberOfCols(message.numberOfCols);
			broadcastAll(table);
			broadcastAll(score);

			start();
		} else if (message.delay) {
			store.changeDelay(message.delay);

			start();

			broadcastOthers(message);
		} else if (message.action) {
			if (message.action === 'pause') {
				stop();
				broadcastOthers({playing: false});
			} else if (message.action === 'play') {
				start();
				broadcastOthers({playing: true});
			}
		} else {
			const {x, y, state: cellState} = message;

			store.changeCell(x, y, cellState);

			broadcastOthers(message);
		}
	}
});

const tick = (currentCol) => {
	const column = store.state.table.rows.map(row => row.cells[currentCol]);

	column.forEach(cell => pins.write(cell.pin, cell.state));
	server.broadcast({currentCol});
};

const s = something(tick);

const cleanup = () => {
	stop();
	pins.closeAll();
};

const exitHandler = e => {
	if (e) {
		console.log(e); // eslint-disable-line no-console
	}

	process.exit();
};

process.on('exit', cleanup);
process.on('SIGINT', exitHandler);
process.on('uncaughtException', exitHandler);

const start = () => {
	const state = store.state;

	return s.start(numberGenerator(state.numberOfCols), state.delay);
};
const stop = () => s.stop();
start();
