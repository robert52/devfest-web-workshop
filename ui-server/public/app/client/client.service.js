(function() {
  'use strict';

  angular
  .module('client')
  .factory('Client', Client);

  Client.$inject = ['$http', 'config'];

  function Client($http, config) {
    var serviceBase = config.api.url+'/api/clients';
    var factory = {
      create: createClient,
      getAll: getAllClients,
      update: updateClient,
      remove: removeClient
    };

    function createClient(client) {
      var action = $http.post(serviceBase, client);

      return action
      .then(function success(results) {
        return results.data;
      });
    }

    function getAllClients() {
      var action = $http.get(serviceBase);

      return action
      .then(function success(results) {
        return results.data;
      });
    }

    function updateClient(client) {
      var action = $http.put(serviceBase + '/' + client.id, client);

      return action
      .then(function success(results) {
        return results.data;
      });
    }

    function removeClient(id) {
      var action = $http.delete(serviceBase + '/' + id);

      return action
      .then(function success(results) {
        return results.data;
      });
    }

    return factory;
  }

}());
