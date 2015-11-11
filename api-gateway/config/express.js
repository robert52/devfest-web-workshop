'use strict';

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var config = require('./main');

module.exports.init = function(app) {
  /**
   * Common express configs
   */
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.disable('x-powered-by');

  // enable C.O.R.S.
  if (config.cors) {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  app.use(session({
    secret: 'On#MustNotGiv3S#cretsAwAy!2any1',
    key: 'skey.sid',
    resave: false,
    saveUninitialized: true
  }));
};
