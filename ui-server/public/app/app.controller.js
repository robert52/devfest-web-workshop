(function() {
  'use strict';

  angular
  .module('erp')
  .controller('AppController', AppController);

  AppController.$inject = ['Auth', '$scope'];

  function AppController(Auth, $scope) {
    var vm = this;
    vm.user = {};
    vm.signout = signout;

    initialize();

    function initialize() {
      vm.user = Auth.currentUser;
    }

    function signout() {
      Auth.signout();
    }

    // watch for changes related to current user
    $scope.$watch(function watchCurrentUser() {
      return Auth.currentUser;
    }, function(newValue, oldValue) {
      vm.user = newValue;
    });
  }

}());
