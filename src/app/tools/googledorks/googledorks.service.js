(function () {
    'use strict';

    angular
        .module('ncwatch')
        .factory('GoogleDorksService', GoogleDorksService);

    /** @ngInject */
    function GoogleDorksService($http) {
        var service = {};      

        return service;       
    }
})();