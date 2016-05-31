(function() {
    'use strict';

    angular
        .module('ncwatch')
        .factory('BuildwithService', BuildwithService);

    /** @ngInject */
    function BuildwithService($http) {

        var service = {};

        service.buildwith = buildwith;

        return service;

        function buildwith(domain){
            return $http({
                method: 'GET',
                url: '/api/informations/buildwith?domain=' + domain,
                //url: 'http://api.builtwith.com/v9/api.json?key=' + buildwithKey + '&lookup=' + domain,
                headers: { 'Content-Type': 'application/json'}
            });
        }

    }
})();
