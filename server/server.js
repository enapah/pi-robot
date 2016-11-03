const express = require('express'),
	server = require('http').createServer(),
	WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server});

module.exports = function start(port, callbacks) {
	const broadcastAll = message => wss.clients.forEach(client => {
		client.send(JSON.stringify(message));
	});

	wss.on('connection', ws => {
		const broadcastOthers = message => wss.clients.forEach(client => {
			if (client !== ws) {
				client.send(JSON.stringify(message));
			}
		});

		const sendClient = message => ws.send(JSON.stringify(message));

		callbacks.onConnection(sendClient, broadcastOthers, broadcastAll);

		ws.on('message', message => {
			callbacks.onMessage(JSON.parse(message), sendClient, broadcastOthers, broadcastAll);
		});
	});

	const app = express();
	app.use(express.static('dist'));
	server.on('request', app);

	server.listen(port, () => console.log(`listening on ${port}`)); // eslint-disable-line no-console

	return {
		broadcast: message => wss.clients.forEach(client => client.send(JSON.stringify(message)))
	};
};
