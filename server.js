// server.js

    // set up ========================
    var express  = require('express');
    var http = require('http');
    var path = require('path');
    var app = express();                               // create our app w/ express

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    app.use('/css', express.static(__dirname + '/public/css'));
    app.use('/fonts', express.static(__dirname + '/public/fonts'));
    app.use('/img', express.static(__dirname + '/public/img'));
    app.use('/js', express.static(__dirname + '/public/js'));
    app.use('/views', express.static(__dirname + '/public/views'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));

    // listen (start app with node server.js) ======================================
    var server = http.createServer(app).listen(1337);
    //app.listen(1337);
    console.log("App listening on port 1337");