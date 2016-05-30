(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('ShodanController', ShodanController);

    /** @ngInject */
    function ShodanController(ShodanService) {
        var vm = this;

        vm.shodan = shodan;

        function shodan(){
            var domain = vm.domain;

            ShodanService.shodan(domain).success(function(res){
                vm.shodanResult = res;
            });
        }

    }
})();
