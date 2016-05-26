(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('WhoIsController', WhoIsController);

	/** @ngInject */
	function WhoIsController(WhoIsService) {
		var vm = this;

		vm.whois = whois;

		function whois(){
			var domain = vm.domain;

			WhoIsService.whois(domain).success(function(res) {
				vm.whoIsResult = res;
			});
		}
	}
})();
