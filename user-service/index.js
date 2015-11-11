'use strict';

var quark = require('quark')();
var config = require('./config/main');

/**
 *  Module exports
 */
module.exports = quark;

// initialize handlers
require('./lib/handler').initialize(quark);

quark.knex = require('./config/knex').instance();

// start listening if not loaded by another module
if (!module.parent) {
  quark.listen({ port: config.port, hostname: config.hostname }, function(err, addr) {
    if (err) throw err;

    console.log('micro service %s is running on %s:%s', config.name, addr.address, addr.port);
  });
}
