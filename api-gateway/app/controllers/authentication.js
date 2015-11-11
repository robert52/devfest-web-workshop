'use strict';

var quark = require('quark')();
var config = require('../../config/main');

/**
 *  Module exports
 */
module.exports.authenticate = authenticateUser;

/**
 *  Forward to quark auth micro-service for pattern `{ entity: 'auth', ... }`
 */
quark.client({
  port: config.services.auth.port,
  hostname: config.services.auth.hostname
}, {
  entity: 'auth'
});

function authenticateUser(req, res, next) {

  // TODO: add validation for `body`

  quark.exec({
    entity: 'auth',
    action: 'verify_user',
    data: {
      email: req.body.email,
      password: req.body.password
    }
  }, function(err, user) {
    if (err && err.type === 'authentication_failed') {
      res.status(400).json(err);
    }

    if (err) {
      return next(err);
    }

    res.json(user);
  });
}
