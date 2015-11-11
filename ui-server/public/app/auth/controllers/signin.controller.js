(function() {
  'use strict';

  angular
  .module('auth')
  .controller('SigninController', SigninController);

  SigninController.$inject = ['Auth', '$location'];

  function SigninController(Auth, $location) {
    var vm = this;
    vm.user = {};
    vm.errorMessage = '';
    vm.signinUser = signinUser;

    initialize();

    function initialize() {
      if (Auth.currentUser) {
        $location.path('/');
      }
    }

    function signinUser() {
      return Auth.signin(vm.user).then(function(data) {
        if (data.error) {
          vm.errorMessage = data.message;
          return data;
        }

        $location.path('/' );
      });
    };
  }

}());
