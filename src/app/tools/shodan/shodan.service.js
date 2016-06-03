(function() {
    'use strict';

    angular
        .module('ncwatch')
        .factory('ShodanService', ShodanService);

    /** @ngInject */
    function ShodanService($http) {
        var service = {};

        service.shodanHost = shodanHost;

        return service;

        function shodanHost(domain){
            return $http({
                method: 'GET',
                url: '/api/informations/shodanHost',
                params: {domain: domain},
                headers: { 'Content-Type': 'application/json' }
            });
        }

    }
})();
