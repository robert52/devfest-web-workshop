'use strict';

// Get environment or set default environment to development
var ENV = process.env.NODE_ENV || 'development';

var http = require('http');
var express = require('express');
var config = require('./config/main');
var app = express();
var server;

// Set express variables
app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

// Initialize every config
require('./config/express').init(app);

//app.use('/', require('./app/routes/main'));

// Set global error handler
app.use(function(err, req, res, next) {
  res.status(500).json(err);
});

// Start the app if not loaded by another module
if (!module.parent) {
  server = http.createServer(app);
  server.listen(config.port || 3000);
  console.log('%s is running, listening on port: %s, environment: %s', config.app.name, config.port, ENV.toLowerCase());
}

module.exports = app;
