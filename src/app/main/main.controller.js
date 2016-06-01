(function() {
	'use strict';

	angular.module('ncwatch')
	.controller('MainController', MainController);

	/** @ngInject */
	function MainController(WhoIsService, GoogleDorksService, SslService, $q) {
		var vm = this;

		vm.watch = watch;
		vm.hasResult = false;

		var tools = { 'WHOIS': 0, 'GOOGLEDORK': 1, 'SSL': 2, 'BUILTWITH': 3};

		function whois() {
			var d = $q.defer();
			WhoIsService.whois(vm.domain).then(function(result) { d.resolve(result); });
			return d.promise;
		};

		function googleSearch() {
			var d = $q.defer();
			var query = "filetype:pdf OR filetype:xlsx OR filetype:pptx OR filetype:docx site:"+vm.domain;
			GoogleDorksService.googleSearch(query).then(function(result) { d.resolve(result); });
			return d.promise;
		};

		function ssl() {
			var d = $q.defer();
			SslService.getSsl(vm.domain).then(function(result) { d.resolve(result); });
			return d.promise;
		};

		function watch(){
			var promises = [];

			// Add at specifi index 
			promises.splice(tools.WHOIS, 0, whois());
			promises.splice(tools.GOOGLEDORK, 0, googleSearch());
			//promises.splice(tools.SSL, 0, ssl());

			$q.all(promises)
				.then(function(result) {
				
					vm.watchResult = {
					'BUILTWITH': {'title': 'BuiltWith', 'content': 4, 'route' : 'tools.buil'},
					'HAVEIBEENPWNED': {'title': 'HaveIBeenPwned', 'content': 4},
					'FILES': {'title': 'Relatives Files', 'content': result[tools.GOOGLEDORK].data.slice(-2)},
					'SHODAN': {'title': 'Shodan', 'content': 4},
					'SSL': {'title': 'Ssl labs', 'content': 3/*result[tools.SSL].data*/},
					'WHOIS': {'title': 'Whois', 'content': result[tools.WHOIS].data}};
					
					vm.hasResult = true;
				});
		}

		

	}
})();
