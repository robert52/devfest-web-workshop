'use strict';

var User = require('./model');

/**
 *  Module exports
 */
module.exports.initialize = initialize;

function initialize(quark) {
  quark.define({
    entity: 'user',
    action: 'create'
  }, function(args, callback) {
    User.create(args.data, function(err, user) {
      if (err) {
        return callback(err);
      }

      callback(null, user);
    });
  });

  quark.define({
    entity: 'user',
    action: 'find_by_email'
  }, function(args, callback) {
    User.findByEmail(args.data.email, function(err, user) {
      if (err) {
        return callback(err);
      }

      callback(null, user);
    });
  });

  quark.define({
    entity: 'user',
    action: 'find_by_id'
  }, function(args, callback) {
    User.findById(args.data.id, function(err, user) {
      if (err) {
        return callback(err);
      }

      callback(null, user);
    });
  });

  quark.define({
    entity: 'user',
    action: 'get_all'
  }, function(args, callback) {
    User.getAll(function(err, users) {
      if (err) {
        return callback(err);
      }

      callback(null, users);
    });
  });
}
