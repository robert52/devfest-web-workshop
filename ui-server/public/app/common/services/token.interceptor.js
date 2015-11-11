(function() {
  'use strict';

  angular.module('common')
  .factory('TokenInterceptor', TokenInterceptor);

  TokenInterceptor.$inject = ['$q', '$window'];

  function TokenInterceptor($q, $window) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }

        return config;
      }
    };
  }

}());
