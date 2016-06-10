(function () {
    'use strict';

    angular
        .module('ncwatch')
        .controller('DnsBlController', DnsBlController);

    /** @ngInject */
    function DnsBlController($mdToast, ToolsService, DnsBlService, HowToMessages, InfosMessages) {
        var vm = this;
        vm.isBL = isBL;
        vm.exportData = exportData;

        vm.DNSBL_HOW_TO = HowToMessages.dnsbl;
        vm.DNSBL_MESSAGE_INFO = InfosMessages.dnsbl;

        function isBL() {
            DnsBlService.getDnsBl(vm.domain).success(function (res) {
                if (res.success) {
                    vm.saveDomain = vm.domain;
                    vm.dnsBlResult = res;
                    var result = res.data.result;
                    var sortedResult = [];
                    vm.isNotListed = true;
                    for(var i = 0;i < result.length; i++) {
                        if (result[i].status == "listed") {
                            vm.isNotListed = false;
                            sortedResult.push(result[i]);
                        }
                    }

                    vm.hasError = false;
                    vm.hasResult = true;
                   
                    vm.result = sortedResult;
                }
                else {
                    vm.hasResult = false;
                    vm.hasError = true;
                    vm.message = "Domaine non défini";
                }
            });
        }

        function exportData() {
            ToolsService.exportDataInFile('dnsbl', vm.saveDomain, vm.dnsBlResult)
                .success(function() {
                    showSimpleToast('Les résultats de DNS BL ont bien été exportés (dossier export de l\'application) !')
                });
        }

        function showSimpleToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom')
                    .hideDelay(3000)
            );
        }

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }
       
    }
})();