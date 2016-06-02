(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('HaveIBeenPwnedController', HaveIBeenPwnedController);

	/** @ngInject */
	function HaveIBeenPwnedController(HaveIBeenPwnedService, HowToMessages, InfosMessages) {
		var vm = this;

		vm.haveIBeenPwned = haveIBeenPwned;
		vm.HAVEIBEENPWNED_HOW_TO = HowToMessages.haveIBeenPwend;
		vm.HAVEIBEENPWNED_MESSAGE_INFO = InfosMessages.haveIBeenPwend;

		function haveIBeenPwned(){

			HaveIBeenPwnedService.haveIBeenPwned(vm.email)
			.success(function(res){
				
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
	}
})();
