'use strict';

var Knex = require('knex');
var config = require('./main');
var knex;

/**
 *  Module exports
 */
module.exports.init = init;
module.exports.instance = getInstance;

/**
 *  Get an existing kenx intance or initialize one
 */
function getInstance() {
  if (knex) {
    return knex;
  }

  return init();
}

/**
 *  Initialize a new knex instance
 *
 *  @return {Object} knex - new instance
 */
function init() {
  knex = Knex({
    client: config.db.client,
    connection: config.db.connection
  });

  return knex;
}
