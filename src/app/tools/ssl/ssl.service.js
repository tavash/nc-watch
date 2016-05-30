(function() {
	'use strict';

	angular
	.module('ncwatch')
	.factory('SslService', SslService);

	/** @ngInject */
	function SslService($http) {
		var service = {};

		service.getSsl = getSsl;
		return service;

		function getSsl(domain){
			return $http({
				method: 'GET',
				url: '/api/ssl/scan',
				params: {domain: domain},
				headers: { 'Content-Type': 'application/json' }
			});
		}  
	}
})();
