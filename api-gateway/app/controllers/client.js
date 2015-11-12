'use strict';

var quark = require('quark')();
var config = require('../../config/main');

/**
 *  Module exports
 */
module.exports.create = createClient;
module.exports.findById = findClientById;
module.exports.getAll = getAllClients;
module.exports.update = updateClient;
module.exports.remove = removeClient;

/**
 *  Forward to quark user micro-service for pattern `{ entity: client, ... }`
 */
quark.client({
  port: config.services.client.port,
  hostname: config.services.client.hostname
}, {
  entity: 'client'
});

function createClient(req, res, next) {
  quark.exec({
    entity: 'client',
    action: 'create',
    data: req.body
  }, function(err, client) {
    if (err) {
      return next(err);
    }

    res.status(201).json(client);
  });
}

function findClientById(req, res, next) {
  quark.exec({
    entity: 'client',
    action: 'find_by_id',
    data: {
      id: req.params.clientId
    }
  }, function(err, client) {
    if (err) {
      return next(err);
    }

    res.json(client);
  });
}

function getAllClients(req, res, next) {
  quark.exec({
    entity: 'client',
    action: 'get_all',
    data: {
      limit: +req.query.limit || 25,
      offset: +req.query.offset || 0
    }
  }, function(err, clients) {
    if (err) {
      return next(err);
    }

    res.json(clients);
  });
}

function updateClient(req, res, next) {
  var data = req.body;
  data.id = req.params.clientId;

  quark.exec({
    entity: 'client',
    action: 'update',
    data: data
  }, function(err, client) {
    if (err) {
      return next(err);
    }

    res.json(client);
  });
}

function removeClient(req, res, next) {
  quark.exec({
    entity: 'client',
    action: 'delete',
    data: {
      id: req.params.clientId
    }
  }, function(err, client) {
    if (err) {
      return next(err);
    }

    res.json(client);
  });
}
