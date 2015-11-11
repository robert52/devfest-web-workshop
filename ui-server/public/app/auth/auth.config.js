(function() {
  'use strict';

  angular
  .module('auth')
  .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/register', {
      templateUrl: 'app/auth/views/register.html',
      controller: 'RegisterController as vm'
    })
    .when('/signin', {
      templateUrl: 'app/auth/views/signin.html',
      controller: 'SigninController as vm'
    });
  }

}());
