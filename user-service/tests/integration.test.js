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

describe('entity:user', function() {
  var _user = {};

  before(function(done) {
    app.listen({ port: config.port, hostname: config.hostname }, function(err, addr) {
      if (err) throw err;

      done();
    });
  });

  after(function(done) {
    app.knex('users').truncate().asCallback(function(err) {
      if (err) throw err;

      app.close(function() {
        done();
      });
    })
  });

  describe('action:create', function() {
    it('should create a new user', function(done) {
      app.exec({
        entity: 'user',
        action: 'create',
        data: {
          name: 'John Doe',
          email: 'john.doe@test.com',
          password: 'pass1234',
        }
      }, function(err, user) {
        if (err) throw err;

        should.exist(user.id);
        should.not.exist(user.password);
        should.not.exist(user.salt);
        user.name.should.equal('John Doe');
        user.email.should.equal('john.doe@test.com');

        _user = user;

        done();
      });
    });
  });

  describe('action:find_by_email', function() {
    it('should get a user by e-mail', function(done) {
      app.exec({
        entity: 'user',
        action: 'find_by_email',
        data: {
          email: 'john.doe@test.com'
        }
      }, function(err, user) {
        if (err) throw err;

        should.exist(user.id);
        should.exist(user.password);
        should.exist(user.salt);
        user.name.should.equal('John Doe');
        user.email.should.equal('john.doe@test.com');
        done();
      });
    });
  });

  describe('action:find_by_id', function() {
    it('should get a user by id', function(done) {
      app.exec({
        entity: 'user',
        action: 'find_by_id',
        data: {
          id: _user.id
        }
      }, function(err, user) {
        if (err) throw err;

        should.not.exist(user.password);
        should.not.exist(user.salt);
        user.name.should.equal('John Doe');
        user.email.should.equal('john.doe@test.com');
        done();
      });
    });
  });

  describe('action:get_all', function() {
    it('should get all users', function(done) {
      app.exec({
        entity: 'user',
        action: 'get_all'
      }, function(err, users) {
        if (err) throw err;

        users.length.should.equal(1);
        done();
      });
    });
  });

});
