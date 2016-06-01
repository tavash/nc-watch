(function() {
	'use strict';

	angular
	.module('ncwatch')
	.factory('CrawlService', CrawlService);

	/** @ngInject */
	function CrawlService($http) {
		var service = {};

		service.crawl = crawl;
		service.getRobots = getRobots;
		return service;

		function crawl(url) {
			return $http({
				method: 'POST',
				url: '/api/crawl',
				data: JSON.stringify({'url': url}),
				headers: { 'Content-Type': 'application/json' }
			});
		}

		function getRobots(url) {
			return $http({
				method: 'GET',
				url: '/api/crawl/robots',
				params: {url: url},
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
})();
