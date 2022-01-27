var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const GetUserIP = require('get-user-ip')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resumoRouter = require('./routes/resumo');
var resumoTipoErroRouter = require('./routes/resumo-tipo-erro');
var detalhesDescartadosRouter = require('./routes/detalhes-descartados');
var tokenRouter = require('./routes/token');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  console.log('mostrandoip: ');
  console.log(GetUserIP(req,['headers.cf-connecting-ip']))
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/proxy/resumo', resumoRouter);
app.use('/proxy/resumo-tipo-erro', resumoTipoErroRouter);
app.use('/proxy/detalhes-descartados', detalhesDescartadosRouter);
app.use('/proxy/detalhes-descartados', detalhesDescartadosRouter);
app.use('/token', tokenRouter);

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
