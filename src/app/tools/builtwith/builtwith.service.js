(function() {
    'use strict';

    angular
        .module('ncwatch')
        .factory('BuiltwithService', BuiltwithService);

    /** @ngInject */
    function BuiltwithService($http) {

        var service = {};

        service.builtwith = builtwith;

        return service;

        function builtwith(domain){
            return $http({
                method: 'GET',
                url: '/api/informations/buildwith?domain=' + domain,
                //url: 'http://api.builtwith.com/v9/api.json?key=' + buildwithKey + '&lookup=' + domain,
                headers: { 'Content-Type': 'application/json'}
            });
        }

    }
})();
