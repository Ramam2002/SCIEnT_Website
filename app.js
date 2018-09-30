
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var models = require('./models');
var sequelize = require('sequelize');
var Admins = models.Admins; 


/* all the routes for the application are declared here */
var index = require('./routes/index');
var register = require('./routes/register');
var admin = require('./routes/admin'); 
var facilities = require('./routes/facilities');
var projects = require('./routes/projects');
var hallBooking = require('./routes/hallBooking');
var donations = require('./routes/donations');
var inventory = require('./routes/inventory');
var resources = require('./routes/resources');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* all the routes for the application are used here */
app.use('/', index);
app.use('/', register);
app.use('/', donations);
app.use('/admin', admin);
app.use('/admin', facilities);
app.use('/admin', projects);
app.use('/admin', hallBooking);
app.use('/admin', inventory);
app.use('/admin', resources);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

models.sequelize.sync().then(function () {
  console.log('Tables are created');
});

// var adminName = 'levelOneAdmin';
// var adminPwd = 'scientAdmin';
// var salt = bcrypt.genSaltSync(1);
// var hash = bcrypt.hashSync(adminPwd, salt);
// adminPwd = hash;
// var adminDetails = {
//     adminName: adminName,
//     password: adminPwd,
//     adminLevel: 'One'
// };
//   Admins.sync({force: false})
//   .then( function() {
//     return Admins.create(adminDetails);
//     console.log('Demo level one admin added');
//   });

module.exports = app;
