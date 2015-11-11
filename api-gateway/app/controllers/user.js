'use strict';

var quark = require('quark')();
var config = require('../../config/main');

/**
 *  Module exports
 */
module.exports.create = createUser;
module.exports.findById = findUserById;
module.exports.getAll = getAllUsers;

/**
 *  Forward to quark user micro-service for pattern `{ entity: user, ... }`
 */
quark.client({
  port: config.services.user.port,
  hostname: config.services.user.hostname
}, {
  entity: 'user'
});

function createUser(req, res, next) {
  quark.exec({
    entity: 'user',
    action: 'create',
    data: req.body
  }, function(err, user) {
    if (err) {
      return next(err);
    }

    res.json(user);
  });
}

function findUserById(req, res, next) {
  quark.exec({
    entity: 'user',
    action: 'find_by_id',
    data: {
      id: req.params.userId
    }
  }, function(err, user) {
    if (err) {
      return next(err);
    }

    res.json(user);
  });
}

function getAllUsers(req, res, next) {
  quark.exec({
    entity: 'user',
    action: 'get_all',
    data: {
      limit: +req.query.limit || 25,
      offset: +req.query.offset || 0
    }
  }, function(err, users) {
    if (err) {
      return next(err);
    }

    res.json(users);
  });
}
