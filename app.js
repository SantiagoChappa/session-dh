const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const methodOverride= require('method-override')
const rutasIndex = require('./src/routes/indexRouter.js')
const rutasProductos= require('./src/routes/listaProductosRouter.js')

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(session({secret:'Secreto!!!'}))

app.use('/', rutasIndex)
app.use('/productos', rutasProductos)

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
  res.render('error-404');
});

module.exports = app;
