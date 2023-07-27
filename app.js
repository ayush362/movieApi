var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet')

var indexRouter = require('./routes/index');
const movieRoutes = require('./routes/movie')
const searchRoutes = require('./routes/search')
// var usersRouter = require('./routes/users');

var app = express();
app.use(helmet())
// doubt how?
app.use((req, res, next) => {
  if (req.query.api_key != 12345678) {
    res.status(401)
    res.json("Invalid Api key!")
  }
  else {
    next()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/movie', movieRoutes)
app.use('/search', searchRoutes)
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
