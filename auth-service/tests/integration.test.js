'use strict';

/**
 * Important! Set the environment to test
 */
process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var app = require('../index');
var config = require('../config/environments/test');

chai.use(require('chai-things'));

describe('entity:auth', function() {
  var _user = {};

  before(function(done) {

    // mock user service
    app.define({
      entity: 'user',
      action: 'verify'
    }, function(args, callback) {
      // generate random id
      callback(null, {
        name: args.data.name,
        email: args.data.email,
        id: Date.now()+''
      });
    });

    app.define({
      entity: 'user',
      action: 'find_by_id'
    }, function(args, callback) {
      // generate random id
      callback(null, {
        email: 'john.doe@test.com',
        id: args.data.id
      });
    });

    app.listen({ port: config.port, hostname: config.hostname }, function(err, addr) {
      if (err) throw err;

      done();
    });
  });

  after(function(done) {
    app.knex('tokens').truncate().asCallback(function(err) {
      if (err) throw err;

      app.close(function() {
        done();
      });
    })
  });

  describe('action:verify_user', function() {
    it('should authenticate user and generate token if user has valid credentials', function(done) {
      app.exec({
        entity: 'auth',
        action: 'verify_user',
        data: {
          email: 'john.doe@test.com',
          password: 'pass1234',
        }
      }, function(err, user) {
        if (err) throw err;

        should.exist(user.id);
        should.exist(user.token);
        should.not.exist(user.password);
        should.not.exist(user.salt);
        user.email.should.equal('john.doe@test.com');

        _user = user;

        done();
      });
    });
  });

  describe('action:verify_token', function() {
    it('should verify if a token is valid', function(done) {
      app.exec({
        entity: 'auth',
        action: 'verify_token',
        data: {
          token: _user.token
        }
      }, function(err, user) {
        if (err) throw err;

        should.not.exist(user.password);
        should.not.exist(user.salt);
        user.id.should.equal(_user.id);
        user.email.should.equal(_user.email);

        done();
      });
    });
  });

});
