'use strict';

var Token = require('./model');

/**
 *  Module exports
 */
module.exports.initialize = initialize;

function initialize(quark) {
  quark.define({
    entity: 'auth',
    action: 'verify_user'
  }, function(args, callback) {
    quark.exec({
      entity: 'user',
      action: 'verify',
      data: {
        email: args.data.email,
        password: args.data.password
      }
    }, function(err, user) {
      if (err) {
        return callback(err);
      }

      if (!user) {
        err = new Error('Authentication failed.');
        err.type = 'authentication_failed';
        return callback(err);
      }

      Token.generate(user, function(err, token) {
        if (err) {
          return callback(err);
        }

        user.token = token;
        callback(null, user);
      });
    });
  });

  quark.define({
    entity: 'auth',
    action: 'verify_token'
  }, function(args, callback) {
    Token.verify(args.data.token, function(err, token) {
      if (err) {
        return callback(err);
      }

      if (!token) {
        return callback(null, null);
      }

      quark.exec({
        entity: 'user',
        action: 'find_by_id',
        data: {
          id: token.user_id
        }
      }, callback);
    });
  });
}
