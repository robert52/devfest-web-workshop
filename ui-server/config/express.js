'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var serveStatic = require('serve-static');
var config = require('./main');

module.exports.init = function(app) {
  var root = app.get('root');

  /**
   * Common express configs
   */
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.disable('x-powered-by');

  // app.use(session({
  //   secret: 'On#MustNotGiv3S#cretsAwAy!2any1',
  //   key: 'skey.sid',
  //   resave: false,
  //   saveUninitialized: true
  // }));

  if (config.serveStatic) {
    app.use(serveStatic(path.join(root, 'public')));
  }
};
