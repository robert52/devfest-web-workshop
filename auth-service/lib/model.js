'use strict';

var knex = require('../config/knex').instance();
var tokenHelper = require('./token');

module.exports.generate = generateToken;
module.exports.verify = verifyToken;

function generateToken(user, callback) {
  tokenHelper.generate(function(err, hash) {
    if (err) {
      return callback(err);
    }

    var data = {
      user_id: user.id,
      hash: hash
    };

    knex
    .insert(data, 'id')
    .into('tokens')
    .asCallback(function(err, rows) {
      if (err) {
        return callback(err, null);
      }

      // just return the token value;
      callback(null, hash);
    });
  });
}

function verifyToken(hash, callback) {
  knex
  .select('id', 'user_id', 'hash', 'created_at', 'updated_at')
  .where('hash', hash)
  .from('tokens')
  .limit(1)
  .asCallback(function(err, rows) {
    var token = rows[0];

    if (err) {
      return callback(err, null);
    }

    return callback(null, token);
  });
}
