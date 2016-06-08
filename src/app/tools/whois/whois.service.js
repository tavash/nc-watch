(function() {
	'use strict';

	angular
	.module('ncwatch')
	.factory('WhoIsService', WhoIsService);

	/** @ngInject */
	function WhoIsService($http) {
		var service = {};

		service.whois = whois;
		service.geocode = geocode;

		return service;

		function whois(domain){
			return $http({
				method: 'GET',
				url: '/api/whois',
				params: {domain: domain},
				headers: { 'Content-Type': 'application/json' }
			});
		}

		function geocode(address) {
			return $http({
				method: 'GET',
				url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
})();
