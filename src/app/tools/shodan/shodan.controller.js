(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('ShodanController', ShodanController);

    /** @ngInject */
    function ShodanController($scope, ShodanService) {
        var vm = this;

        vm.shodanHost = shodanHost;
        vm.hostIsLoad = false;

        function shodanHost(){
            var domain = vm.domain;

            ShodanService.shodanHost(domain).success(function(res){
                vm.shodanHostResult = res;
                vm.hostIsLoad = true;
            });
        }

    }
})();