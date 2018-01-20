var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var net = require('net');

var mongoose = require('mongoose');
var session = require('express-session');

var index = require('./routes/index').route;
var server = require('./routes/index').socket;
var users = require('./routes/users');
var room = require('./routes/room');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({
    secret:'@#@sadfdfasdfasdfasfsdfasdffsdfs#@$#$',
    resave: false,
    saveUninitialized:true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

//db
mongoose.connect('mongodb://localhost:27017/donbada') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Mongo DB ON" );
});

// route
app.use('/', index);
app.use('/users', users);
app.use('/room', room);


server.listen(3344, function() {
  console.log('Server listening: ' + JSON.stringify(server.address()));
  server.on('close', function(){
    console.log('Server Terminated');
  });
  server.on('error', function(err){
    console.log('Server Error: ', JSON.stringify(err));
  });
});

module.exports = app;
