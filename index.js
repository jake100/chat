var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var list = [];
var started = true;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){

  socket.on('message', function(msg){

    var patt = /(.{1,})\1{2,}/;
    var isFalse = patt.test(msg);

  if(!started || msg.length > 144 || msg.length == 0 || isFalse || msg === " " || msg === "  ")return;
    if(!list.includes(msg))list.push(msg);
    else return;
    io.emit('message', msg);
  });
    socket.on('getColor', function(isGreen){
		  io.emit('getColor', isGreen);
  });
	
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});