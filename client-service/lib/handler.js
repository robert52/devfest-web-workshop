'use strict';

var User = require('./model');

/**
 *  Module exports
 */
module.exports.initialize = initialize;

function initialize(quark) {
  quark.define({
    entity: 'client',
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
    entity: 'client',
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
    entity: 'client',
    action: 'get_all'
  }, function(args, callback) {
    User.getAll(function(err, users) {
      if (err) {
        return callback(err);
      }

      callback(null, users);
    });
  });

  quark.define({
    entity: 'client',
    action: 'update'
  }, function(args, callback) {
    User.update(args.data, function(err, user) {
      if (err) {
        return callback(err);
      }

      callback(null, user);
    });
  });

  quark.define({
    entity: 'client',
    action: 'delete'
  }, function(args, callback) {
    User.remove(args.data.id, function(err, user) {
      if (err) {
        return callback(err);
      }

      callback(null, user);
    });
  });
}
