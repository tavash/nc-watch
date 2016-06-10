(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('HaveIBeenPwnedController', HaveIBeenPwnedController);

    /** @ngInject */
    function HaveIBeenPwnedController($mdToast, HaveIBeenPwnedService, ToolsService, HowToMessages, InfosMessages) {
        var vm = this;

        vm.haveIBeenPwned = haveIBeenPwned;
        vm.exportData = exportData;
        vm.HAVEIBEENPWNED_HOW_TO = HowToMessages.haveIBeenPwend;
        vm.HAVEIBEENPWNED_MESSAGE_INFO = InfosMessages.haveIBeenPwend;

        function haveIBeenPwned(){

            HaveIBeenPwnedService.haveIBeenPwned(vm.email)
                .success(function(res){
                    vm.saveEmail = vm.email;
                    vm.haveIBeenPwnedResult = res;
                    vm.isPwned = true;
                    vm.testedEmail = vm.email;
                    for (var i = res.length - 1; i >= 0; i--){
                        res[i].DataClasses = res[i].DataClasses.join(", ");
                        res[i].Logo = "//az594751.vo.msecnd.net/cdn/"+ res[i].Name + "." + res[i].LogoType;
                    }
                })
                .error(function(err){
                    vm.isPwned = false;
                });
        }

        function exportData() {
            ToolsService.exportDataInFile('haveibeenpwned', vm.saveEmail, vm.haveIBeenPwnedResult)
                .success(function() {
                    showSimpleToast('Les résultats de Have I Been Pwned ont bien été exportés (dossier export de l\'application) !')
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
    }
})();
