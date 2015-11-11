(function() {
  'use strict';

  angular.module('common')
  .factory('SigninInterceptor', SigninInterceptor);

  SigninInterceptor.$inject = ['$q', '$location'];

  function SigninInterceptor($q, $location) {
    return {
      responseError: function(rejection) {
        if (401 === rejection.status) {
          $location.path('/signin');
        }

        return $q.reject(rejection);
      }
    };
  }

}());
