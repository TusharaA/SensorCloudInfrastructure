var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var mysql= require('./routes/mysql');

//added temporarily
var main = require('./routes/main');

var app = express();
mysql.createConnectionPool();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/scripts',express.static(path.join(__dirname + '/node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/', routes);
app.use('/users', users);

app.post('/listuserSensorDetails', main.listuserSensorDetails);
app.post('/getSensorTypeCount', main.getSensorTypeCount);
app.post('/listsensorTypeRegion', main.listsensorTypeRegion);
app.post('/listsensorhub',main.listsensorhub);
app.post('/listsensors',main.listsensors);
app.post('/listSensorInstances', main.listSensorsInstances);
app.post('/getSensorData',main.getSensorData);
app.post('/billing',main.getAllSensorHubBilling);
app.post('/sensorBilling',main.getIndividualSensorHubBilling);
app.get('/getTotalRevenue',main.getTotalRevenue);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
