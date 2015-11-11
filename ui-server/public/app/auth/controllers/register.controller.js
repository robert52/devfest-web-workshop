(function() {
  'use strict';

  angular
  .module('auth')
  .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['Auth', '$scope'];

  function RegisterController(Auth, $scope) {
    var vm = this;
    vm.user = {};
    vm.registerUser = registerUser;

    function registerUser() {
      return Auth
      .register(vm.user)
      .then(function(result) {
        //vm.RegisterForm.email.$setValidity('unique', false);
        console.info(result);
      });
    }
  }

}());
