// server.js

// set up ========================
var express  = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/views', express.static(__dirname + '/public/views'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

io.on('connection', function(socket) {
  socket.send(JSON.stringify({data: 'Welcome to the server!'}));

  socket.on('message',function(data){
    console.log(JSON.parse(data));
  });
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
