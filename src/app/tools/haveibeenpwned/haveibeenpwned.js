(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('HaveIBeenPwnedController', HaveIBeenPwnedController);

	/** @ngInject */
	function HaveIBeenPwnedController(HaveIBeenPwnedService) {
		var vm = this;

		vm.haveIBeenPwned = haveIBeenPwned;

		function haveIBeenPwned(){

			HaveIBeenPwnedService.haveIBeenPwned(vm.email)
				.success(function(res){
				
					vm.haveIBeenPwnedResult = res;
					vm.isPwned = true;
					vm.testedEmail = vm.email;
					for (var i = res.length - 1; i >= 0; i--)
						res[i].DataClasses = res[i].DataClasses.join(", ");
				})
				.error(function(err){
					vm.isPwned = false;
				});
		}
	}
})();
