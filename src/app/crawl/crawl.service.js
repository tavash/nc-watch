(function() {
	'use strict';

	angular
	.module('ncwatch')
	.factory('CrawlService', CrawlService);

	/** @ngInject */
	function CrawlService($http) {
		var service = {};

		service.crawl = crawl;
		service.haveIBeenPwned = haveIBeenPwned;

		return service;

		function crawl(url){

			return $http({
				method: 'POST',
				url: '/api/crawl',
				data: JSON.stringify({'url': url}),
				headers: { 'Content-Type': 'application/json' }
			});
		}

		function haveIBeenPwned(email){
			return $http({
				method: 'GET',
				url: 'https://haveibeenpwned.com/api/v2/breachedaccount/'+email,
				headers: { 'Content-Type': 'application/json'}
			});
			
		}
	}
})();
