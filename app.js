//Express
const express = require('express');
const app = express();
const port = 3000;
var server = app.listen(3000, listen);
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Example app listening at http://` + host + ':' + port);
}
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConn);

function newConn(socket) {
    console.log('new connection: ' + socket.id)
}