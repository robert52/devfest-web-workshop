(function() {
  'use strict';

  angular
  .module('auth')
  .factory('Auth', Auth);

  Auth.$inject = ['$http', '$window', '$location', 'config'];

  function Auth($http, $window, $location, config) {
    var serviceBase = config.api.url+'/api';
    var factory = {
      initialize: initialize,
      register: registerUser,
      signin: signinUser,
      signout: signoutUser,
      currentUser: null
    };

    function initialize() {
      var isRegisterPage = $location.path().indexOf('/register') !== -1;
      factory.currentUser = getCurrentUser();

      if (!factory.currentUser && !isRegisterPage) {
        $location.path('/signin');
      }
    }

    function registerUser(user) {
      return $http
      .post(serviceBase + '/users', user)
      .then(function(result) {
        return result.data;
      })
      .catch(function(err) {
        err.data.error = err.data.error || true;
        return err.data;
      });
    }

    function signinUser(user) {
      return $http
      .post(serviceBase + '/auth', user)
      .then(function(result) {
        setCurrentUser(response.data);

        return response.data;
      })
      .catch(function(err) {
        err.data.error = err.data.error || true;

        destroyCurrentUser();

        return err.data;
      });
    }

    function signoutUser() {
      destroyCurrentUser();
      initialize();
    }

    function getCurrentUser() {
      //var user = JSON.parse($window.sessionStorage.user || null);

      // TODO: remove mock user
      var user = {
        name: 'Bruce Wayne',
        email: 'bruce@wayneindustries.com'
      };

      return user;
    }

    function setCurrentUser(data) {
      $window.sessionStorage.user = JSON.stringify(data);
      $window.sessionStorage.token = data.token.value;
      factory.currentUser = data;
    }

    function destroyCurrentUser() {
      $window.sessionStorage.user = '';
      $window.sessionStorage.token = '';
      factory.currentUser = null;
    }

    return factory;
  }

}());
