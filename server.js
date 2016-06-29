var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(8000, function() {
  console.log('Listen on 8000');
});
io.on('connection', function(clientSocket){
  console.log('A User Has Connected');
  clientSocket.on('draw', function(msg){
    clientSocket.broadcast.emit('draw-to-client',msg);
  });
});

app.use(express.static('public'));
