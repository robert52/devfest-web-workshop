'use strict';

var knex = require('../config/knex').instance();
var passwordHelper = require('./password');

/**
 *  Module exports
 */
module.exports.create = createUser;
module.exports.findById = findUserById;
module.exports.findByEmail = findUserByEmail;
module.exports.getAll = getAllUsers;
module.exports.verify = verifyUser;

/**
 *  Create a new user
 *
 *  @param {Number} id
 *  @param {Function} callback
 */
function createUser(data, callback) {
  // hash password
  passwordHelper.hash(data.password, function(err, hashedPassword, salt) {
    if (err) {
      return callback(err);
    }

    data.password = hashedPassword;
    data.salt = salt;

    // create new user
    knex
    .insert(data, 'id')
    .into('users')
    .asCallback(function(err, rows) {
      if (err) {
        return callback(err, null);
      }

      // find the new user by id
      findUserById(rows[0], callback);
    });
  });
}

/**
 *  Find a user by a specific id
 *
 *  @param {Number} id
 *  @param {Function} callback
 */
function findUserById(id, callback) {
  knex
  .select('id', 'name', 'email', 'created_at', 'updated_at')
  .where('id', id)
  .from('users')
  .limit(1)
  .asCallback(function(err, rows) {
    var user = rows[0];

    if (err) {
      return callback(err, null);
    }

    return callback(null, user);
  });
}

/**
 *  Find a user by e-mail
 *  result will include `password` and `salt`
 *
 *  @param {String} email
 *  @param {Function} callback
 */
function findUserByEmail(email, callback) {
  knex
  .select('id', 'name', 'email', 'password', 'salt', 'created_at', 'updated_at')
  .where('email', email)
  .from('users')
  .limit(1)
  .asCallback(function(err, rows) {
    var user = rows[0];

    if (err) {
      return callback(err, null);
    }

    return callback(null, user);
  });
}

/**
 *  Get all users
 *
 *  @param {Number} limit
 *  @param {Number} offset
 *  @param {Function} callback
 */
function getAllUsers(limit, offset, callback) {
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
  .select('id', 'name', 'email', 'created_at', 'updated_at')
  .from('users')
  .limit(limit || 25)
  .offset(offset || 0)
  .asCallback(function(err, rows) {

    if (err) {
      return callback(err, null);
    }

    return callback(null, rows);
  });
}

/**
 *  Check if user has valid credentials
 *
 *  @param {String} email
 *  @param {String} password
 *  @param {Function} callback
 */
function verifyUser(email, password, callback) {
  findUserByEmail(email, function(err, user) {
    if (err) {
      return callback(err);
    }

    // check password againts stored hash&salt combo
    passwordHelper.verify(password, user.password, user.salt, function(err, result) {
      if (err) {
        return callback(err);
      }

      // if password does not match don't return user
      if (result === false) {
        return callback(err, null);
      }

      // remove password and salt from the result
      delete user.password;
      delete user.salt;
      // return user if everything is ok
      callback(null, user);
    });
  });
}
