(function () {
    'use strict';

    angular
        .module('ncwatch')
        .factory('DnsBlService', DnsBlService);

    /** @ngInject */
    function DnsBlService($http) {
        var service = {};

        service.getDnsBl = getDnsBl;
      
        return service;

        function getDnsBl(domain) {
            return $http({
                method: 'GET',
                url: '/api/dnsbl',
                params: {domain: domain},
                headers: {'Content-Type': 'application/json'}
            });
        }
    }
})();