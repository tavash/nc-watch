(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('SslController', SslController);

	/** @ngInject */
	function SslController(SslService) {
		var vm = this;
		vm.getSsl = getSsl;

		function getSsl(){
			SslService.getSsl(vm.domain).success(function(res){
				console.log(res);
				vm.sslResult = res;
				vm.isSsl = true;
			});
		}

	}
})();
