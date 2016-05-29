(function() {
	'use strict';

	angular
	.module('ncwatch')
	.factory('WhoIsService', WhoIsService);

	/** @ngInject */
	function WhoIsService($http) {
		var service = {};

		service.whois = whois;

		return service;

		function whois(domain){
			return $http({
				method: 'GET',
				url: '/api/informations/whois',
				params: {domain: domain},
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
})();
