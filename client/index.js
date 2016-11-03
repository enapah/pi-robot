'use strict';

require('./style.css');
require('./index.html');

var Elm = require('./Main.elm');
var mountNode = document.getElementById('container');

const websocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const websocketHost = `${websocketProtocol}//${location.hostname}:8080`;

var app = Elm.Main.embed(mountNode, {websocketHost});
