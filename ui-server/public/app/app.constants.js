(function() {
  'use strict';

  angular
  .module('erp')
  .constant('config', {
    api: {
      url: 'http://localhost:3010'
    },
    ui: {
      url: 'http://localhost:3020'
    }
  });
}());
