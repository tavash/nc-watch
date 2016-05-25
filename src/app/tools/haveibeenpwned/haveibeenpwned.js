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

			HaveIBeenPwnedService.haveIBeenPwned(vm.email).success(function(res){
				vm.haveIBeenPwnedResult = res;
			});
		}
	}
})();
