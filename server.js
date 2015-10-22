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
  socket.on('message',function(message) {
    var data = JSON.parse(message);
    var coordinates = data.lat + ',' + data.lng + ',1mi';
    console.log(data);

    var client = new Twitter({
      consumer_key: keys.TWITTER_CONSUMER_KEY,
      consumer_secret: keys.TWITTER_CONSUMER_SECRET,
      access_token_key: keys.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.get('search/tweets', {
      // I wish there was a better way to do this...
      q: 'a OR b OR c OR d OR e OR f OR g OR h OR i OR j OR k OR l OR m OR n OR o OR p OR q OR r OR s OR t OR u OR v OR w OR x OR y OR z',
      geocode: coordinates,
      count: 10,
      lang: 'en'
    }, function(error, tweets, response){
      tweets = tweets.statuses;
      for (var key in tweets) {
        socket.send(JSON.stringify(tweets[key].text));
      }
    });
  });
});

http.listen(80, function(){
  console.log('listening on port 80');
});
