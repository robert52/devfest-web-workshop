'use strict';

var _ = require('lodash');
var knex = require('../config/knex').instance();

/**
 *  Module exports
 */
module.exports.create = createClient;
module.exports.findById = findClientById;
module.exports.getAll = getAllClients;
module.exports.update = updateClient;
module.exports.remove = removeClient;

/**
 *  Create a new client
 *
 *  @param {Object} data - client data
 *  @param {Function} callback
 */
function createClient(data, callback) {
  // create new client
  knex
  .insert(data, 'id')
  .into('clients')
  .asCallback(function(err, rows) {
    if (err) {
      return callback(err, null);
    }

    // find the new client by id
    findClientById(rows[0], callback);
  });
}

/**
 *  Find a client by a specific id
 *
 *  @param {Number} id
 *  @param {Function} callback
 */
function findClientById(id, callback) {
  knex
  .select('id', 'name', 'email', 'company', 'created_at', 'updated_at')
  .where('id', id)
  .from('clients')
  .limit(1)
  .asCallback(function(err, rows) {
    var client = rows[0];

    if (err) {
      return callback(err, null);
    }

    return callback(null, client);
  });
}

/**
 *  Get all clients
 *
 *  @param {Number} limit
 *  @param {Number} offset
 *  @param {Function} callback
 */
function getAllClients(limit, offset, callback) {
  if (typeof limit === 'function') {
    callback = limit;
    limit = 25;
    offset = 0;
  }

  if (typeof offset === 'function') {
    callback = offset;
    offset = 0;
  }

  knex
  .select('id', 'name', 'email', 'company', 'created_at', 'updated_at')
  .from('clients')
  .limit(limit || 25)
  .offset(offset || 0)
  .asCallback(function(err, rows) {

    if (err) {
      return callback(err, null);
    }

    return callback(null, rows);
  });
}

function updateClient(data, callback) {
  var temp = _.pick(data, ['name', 'email', 'company']);

  knex('clients')
  .where('id', data.id)
  .update(temp)
  .asCallback(function(err, rows) {
    if (err) {
      return callback(err, null);
    }

    findClientById(data.id, function(err, client) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, client);
    });
  });
}

function removeClient(id, callback) {
  // find the client that we want to delete
  findClientById(id, function(err, client) {
    if (err) {
      return callback(err, null);
    }

    // delete the client
    knex('clients')
    .where('id', id)
    .del()
    .asCallback(function(err, rows) {
      if (err) {
        return callback(err, null);
      }

      // return the deleted client
      callback(null, client);
    });
  });
}
