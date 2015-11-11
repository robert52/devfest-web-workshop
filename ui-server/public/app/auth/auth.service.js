(function() {
  'use strict';

  angular
  .module('auth')
  .factory('Auth', Auth);

  Auth.$inject = ['$http', '$window', '$location'];

  function Auth($http, $window, $location) {
    var serviceBase = 'http://localhost:3030/api';
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
      var request = {
        url: serviceBase + '/auth',
        method: "POST",
        headers: {
          Authorization: 'Basic ' + btoa(user.email + ':' + user.password)
        }
      };

      return $http(request)
      .then(function(response) {
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

    function getAuthUser() {
      return $http
      .get(serviceBase + '/auth')
      .then(function(response) {
        return response.data;
      });
    }

    function getCurrentUser() {
      var user = JSON.parse($window.sessionStorage.user || null);
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
