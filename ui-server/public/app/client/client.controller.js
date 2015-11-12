(function() {
  'use strict';

  angular
  .module('client')
  .controller('ClientController', ClientController);

  ClientController.$inject = ['Client'];

  function ClientController(Client) {
    var vm = this;

    /**
     *  Define bendables
     */
    vm.clients = [];
    vm.newclient = {};
    vm.addClient = addClient;
    vm.saveClient = saveClient;
    vm.deleteClient = deleteClient;

    initialize();

    function initialize() {
      getAll();
    }

    function getAll() {
      return Client.getAll().then(function(clients) {
        vm.clients = clients;

        return clients;
      });
    }

    function addClient(client) {
      var copy = angular.copy(client);

      return Client.create(copy).then(function(client) {
        vm.clients.push(client);
        vm.newclient = {};
      });
    }

    function saveClient(client, id) {
      angular.extend(client, {id: id});

      return Client.update(client);
    }

    function deleteClient(id) {
      Client.remove(id).then(function(client) {
        for (var i = 0; i < vm.clients.length; i++) {
          if (vm.clients[i].id === id) {
            vm.clients.splice(i, 1);
            break;
          }
        }
      });
    }
  }

}());
