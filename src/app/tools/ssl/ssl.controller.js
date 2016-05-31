(function() {
	'use strict';

	angular
	.module('ncwatch')
	.filter('range', function() {
		return function(input, params) {
			var begin = parseInt(params.begin);
			var end = parseInt(params.end);
			var res=[]
			for(var i in input) {
				if(i>= begin && i <= end) {
					res.push(input[i]);
				}
			}
			return res;
		};
	})
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
