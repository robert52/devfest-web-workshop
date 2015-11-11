(function() {
  'use strict';

  angular
  .module('common')
  .config(config);

  function config($httpProvider) {
    $httpProvider.interceptors.push('SigninInterceptor');
    $httpProvider.interceptors.push('TokenInterceptor');
  }

}());
