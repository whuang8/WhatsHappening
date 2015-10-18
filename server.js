// server.js

// set up ========================
var express  = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var Twitter = require('twitter');
var keys = require('./keys');

console.log('Server starting...');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/views', express.static(__dirname + '/public/views'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// Communicate with the client
io.on('connection', function(socket) {
  socket.send(JSON.stringify({data: 'Welcome to the server!'}));

  socket.on('message',function(message) {
    var data = JSON.parse(message);
    var coordinates = data.lat + ',' + data.lng + ',1km';

    var client = new Twitter({
      consumer_key: keys.TWITTER_CONSUMER_KEY,
      consumer_secret: keys.TWITTER_CONSUMER_SECRET,
      access_token_key: keys.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.get('search/tweets', {
      q: 'a', // This is the search query
      geolocation: coordinates,
      count: 10,
      lang: 'en'
    }, function(error, tweets, response){
      // console.log(tweets);
      tweets = tweets.statuses;
      for (var key in tweets) {
        console.log(tweets[key].text + '\n');
      }

      socket.send(JSON.stringify(tweets));
    });
  });
});

http.listen(1337, function(){
  console.log('listening on port 1337');
});
