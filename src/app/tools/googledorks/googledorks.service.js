(function () {
	'use strict';

	angular
	.module('ncwatch')
	.factory('GoogleDorksService', GoogleDorksService);

	/** @ngInject */
	function GoogleDorksService($http) {
		var service = {};      

		service.googleSearch = googleSearch;
		
		return service;     

		function googleSearch(query){
			return $http({
				method: 'GET',
				url: '/api/googleSearch',
				params: {query: query},
				headers: { 'Content-Type': 'application/json' }
			});
		}  
	}
})();