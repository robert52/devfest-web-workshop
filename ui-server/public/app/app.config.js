(function() {
  'use strict';

  angular
  .module('erp')
  .config(config)
  .run(run);

  function config($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }

  run.$inject = ['Auth'];

  function run(Auth) {
    Auth.initialize();
  }

}());
