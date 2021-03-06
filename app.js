var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const helmet = require("helmet");
// Require env
require("dotenv").config();

const mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Routers
var indexRouter = require('./routes/index');
const cpuRouter = require("./routes/cpus");
const gpuRouter = require("./routes/gpus");
const motherboardRouter = require("./routes/motherboards");
const ramRouter = require("./routes/ram");

var app = express();

// Enable Helmet for Security
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use("/cpus", cpuRouter);
app.use("/gpus", gpuRouter);
app.use("/motherboards", motherboardRouter);
app.use("/ram", ramRouter);



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
