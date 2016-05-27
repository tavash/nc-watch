(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('ShodanController', ShodanController);

    /** @ngInject */
    function ShodanController($scope, ShodanService) {
        var vm = this;

        vm.shodan = shodan;
        vm.isLoad = false;

        function shodan(){
            var domain = vm.domain;

            ShodanService.shodan(domain).success(function(res){
                
                vm.shodanResult = res;
                vm.isLoad = true;
            });
        }
    }
})();