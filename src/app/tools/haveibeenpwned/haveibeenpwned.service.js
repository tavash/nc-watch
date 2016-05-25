(function() {
  'use strict';

  angular
  .module('ncwatch')
  .factory('HaveIBeenPwnedService', HaveIBeenPwnedService);

  /** @ngInject */
  function HaveIBeenPwnedService($http) {
    var service = {};

    service.haveIBeenPwned = haveIBeenPwned;

    return service;

    function haveIBeenPwned(email){
      return $http({
        method: 'GET',
        url: 'https://haveibeenpwned.com/api/v2/breachedaccount/'+email,
        headers: { 'Content-Type': 'application/json'}
      });      
    }
  }
})();
