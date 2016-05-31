(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('BuildwithController', BuildwithController);

    /** @ngInject */
    function BuildwithController(BuildwithService) {
        var vm = this;

        vm.buildwith = buildwith;

        function buildwith(){

            BuildwithService.buildwith(vm.domain)
                .success(function(res){
                    vm.buildwithResult = res;
                });
        }
        
    }
})();