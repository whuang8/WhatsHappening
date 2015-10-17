// server.js

    // set up ========================
    var express  = require('express');
    var path = require('path');
    var app      = express();                               // create our app w/ express

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.use('/public', express.static(__dirname + '/public'));

    // listen (start app with node server.js) ======================================
    app.listen(1337);
    console.log("App listening on port 1337");