(function() {
  'use strict';

  angular
  .module('client')
  .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/clients', {
      templateUrl: 'app/client/clients.html',
      controller: 'ClientController as vm'
    });
  }

}());
