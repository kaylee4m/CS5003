var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var onConnect = require('./socket')

var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');

var app = express();
app.use(cors({ origin: '*' }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/rooms', roomsRouter)

// io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
io.set('origins', '*:*');
io.on('connection', function (socket) {
    onConnect(io, socket)
});

http.listen(3001, function () {
    console.log('listening ws on *:3001');
});

module.exports = app;
