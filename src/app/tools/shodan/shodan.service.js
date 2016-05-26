(function() {
    'use strict';

    angular
        .module('ncwatch')
        .factory('ShodanService', ShodanService);

    /** @ngInject */
    function ShodanService($http) {
        var service = {};

        service.shodan = shodan;

        return service;

        function shodan(domain){

            return $http({
                method: 'GET',
                url: '/api/informations/shodan?domain=' + domain,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    }
})();
