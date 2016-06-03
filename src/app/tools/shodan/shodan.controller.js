(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('ShodanController', ShodanController);

    /** @ngInject */
    function ShodanController($scope, ShodanService, HowToMessages, InfosMessages) {
        var vm = this;

        vm.shodanHost = shodanHost;
        vm.SHODAN_HOW_TO = HowToMessages.shodan;
        vm.SHODAN_MESSAGE_INFO = InfosMessages.shodan;
        vm.isLoad = false;

        function shodanHost(){
            var domain = vm.domain;

            ShodanService.shodanHost(domain).success(function(res){
                vm.shodanHostResult = res;

                vm.ports = res.ports;
                vm.dataPorts = res.data;

                vm.isLoad = true;
            });
        }

    }
})();