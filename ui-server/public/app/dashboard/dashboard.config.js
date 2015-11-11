(function() {
  'use strict';

  angular
  .module('dashboard')
  .config(config);

  function config($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController as vm'
    });
  }

}());
