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

describe('entity:client', function() {
  var _client = {};

  before(function(done) {
    app.listen({ port: config.port, hostname: config.hostname }, function(err, addr) {
      if (err) throw err;

      done();
    });
  });

  after(function(done) {
    app.knex('clients').truncate().asCallback(function(err) {
      if (err) throw err;

      app.close(function() {
        done();
      });
    })
  });

  describe('action:create', function() {
    it('should create a new client', function(done) {
      app.exec({
        entity: 'client',
        action: 'create',
        data: {
          name: 'John Doe',
          email: 'john.doe@test.com'
        }
      }, function(err, client) {
        if (err) throw err;

        should.exist(user.id);
        client.name.should.equal('John Doe');
        client.email.should.equal('john.doe@test.com');

        _client = client;

        done();
      });
    });
  });

  describe('action:find_by_id', function() {
    it('should get a client by id', function(done) {
      app.exec({
        entity: 'client',
        action: 'find_by_id',
        data: {
          id: _user.id
        }
      }, function(err, client) {
        if (err) throw err;

        client.name.should.equal('John Doe');
        client.email.should.equal('john.doe@test.com');
        done();
      });
    });
  });

  describe('action:get_all', function() {
    it('should get all clients', function(done) {
      app.exec({
        entity: 'client',
        action: 'get_all'
      }, function(err, clients) {
        if (err) throw err;

        clients.length.should.equal(1);
        done();
      });
    });
  });

  describe('action:update', function() {
    it('should update a client for a given id', function(done) {
      app.exec({
        entity: 'client',
        action: 'update',
        data: {
          id: 1,
          company: 'Test'
        }
      }, function(err, client) {
        if (err) throw err;

        client.id.should.equal(1);
        client.name.should.equal('John Doe');
        client.email.should.equal('john.doe@test.com');
        client.company.should.equal('Test');
        done();
      });
    });
  });

  describe('action:delete', function() {
    it('should delete a client by id and return the deleted client', function(done) {
      app.exec({
        entity: 'client',
        action: 'delete',
        data: {
          id: 1
        }
      }, function(err, client) {
        if (err) throw err;

        client.id.should.equal(1);
        client.name.should.equal('John Doe');
        client.email.should.equal('john.doe@test.com');
        client.company.should.equal('Test');
        done();
      });
    });
  });

});
