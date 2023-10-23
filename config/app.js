
// Module imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');

// Router imports
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
let businessRouter = require('../routes/business')

var app = express();

// Enable sessoions
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));

// view engine setup
app.set('views', path.join(__dirname, '../views')); // view folder
app.set('view engine', 'ejs'); // sets the EJS engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Sets up flash and passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business', businessRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = 'Error!';
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;