(function() {
  'use strict';

  angular
  .module('dashboard')
  .controller('DashboardController', DashboardController);

  //DashboardController.$inject = [];

  function DashboardController() {
    var vm = this;

    initialize();

    function initialize() {
      // initialize logic
    }
  }
}());
