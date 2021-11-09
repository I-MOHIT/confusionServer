var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promotionRouter = require('./routes/promotionRouter');
var leadershipRouter = require('./routes/leadershipRouter');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function auth(req,res,next) {
  console.log(req.headers);

  var authHeader = req.headers.authorization;

  if(authHeader==null){
    var err = new Error('You are not authenticated!');

    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    return next(err);
  }

  // Splits the base64 encoded string into two strings separated by a space,
  // whose first element is the word Base and second is the encoded string,
  // second element is taken and decoded as per base64 and then it is further
  // split on the basis of a : containing the username:password
  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

  var username = auth[0];
  var password = auth[1];

  if(username === 'admin' && password === 'password'){
    next();
  }
  else{
    var err = new Error('Username and/or password is incorrect');
    
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    return next(err);
  }
}

app.use(auth);  //Authorization occurs before any other router middleware and hence any page cannot be accessed randomly

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promotionRouter);
app.use('/leaderships',leadershipRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
