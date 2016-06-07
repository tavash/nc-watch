(function() {
	'use strict';

	angular
	.module('ncwatch')
	.factory('AnalyzerService', AnalyzerService);

	/** @ngInject */
	function AnalyzerService($http) {
		var service = {};

		service.analyzer = analyzer;
		service.getRobots = getRobots;
		return service;

		function analyzer(url) {
			return $http({
				method: 'POST',
				url: '/api/analyzer',
				data: JSON.stringify({'url': url}),
				headers: { 'Content-Type': 'application/json' }
			});
		}

		function getRobots(url) {
			return $http({
				method: 'GET',
				url: '/api/analyzer/robots',
				params: {url: url},
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
})();
