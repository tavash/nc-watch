(function() {
	'use strict';

	angular.module('ncwatch')
	.controller('MainController', MainController);

	/** @ngInject */
	function MainController(WhoIsService, GoogleDorksService, SslService, HaveIBeenPwnedService, $q) {
		var vm = this;

		vm.watch = watch;
		vm.hasResult = false;
		vm.watchResult = {	'BUILTWITH': {'title': 'BuiltWith', 'content': null, 'route' : 'tools.builtwith'},
		'HAVEIBEENPWNED': {'title': 'HaveIBeenPwned', 'content': null, 'route' : 'tools.haveibeenpwned'},
		'FILES': {'title': 'Relatives Files', 'content': null, 'route' : 'tools.googledorks'},
		'SHODAN': {'title': 'Shodan', 'content': null, 'route' : 'tools.shodan'},
		'SSL': {'title': 'Ssl labs', 'content': null, 'route' : 'tools.ssl'},
		'WHOIS': {'title': 'Whois', 'content': null, 'route' : 'tools.whois'}};

		function whois() {
			var d = $q.defer();
			WhoIsService.whois(vm.domain).then(function(result) { d.resolve(result); });
			return d.promise;
		};

		function googleSearch() {
			var d = $q.defer();
			//var query = "filetype:pdf OR filetype:xlsx OR filetype:pptx OR filetype:docx site:"+vm.domain;
			var query = '"@' + vm.domain + '" -www. ' + vm.domain;
			GoogleDorksService.googleSearch(query).then(function(result) { d.resolve(result); });
			return d.promise;
		};

		function ssl() {
			var d = $q.defer();
			SslService.getSsl(vm.domain).then(function(result) { d.resolve(result); });
			return d.promise;
		};

		function haveibeenpwned(){
			var d = $q.defer();
			HaveIBeenPwnedService.haveIBeenPwned("foo@bar.com").then(function(result) { d.resolve(result); });
			return d.promise;
		};

		function extractEmails (text)
		{
			//return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
			return text.match(/([a-zA-Z0-9._-]+@adacis.net+)/gi);

			/*var data =result[i].data;
			console.log(data);
			//var emails = [];
			var text = '';
			for (var i = data.length - 1; i >= 0; i--) {
				console.log(data[i].description);
				text += data[i].description.toString();
			}
			console.log(text);
			var emails = extractEmails(text);
			console.log(emails);*/
		};

		function watch() {
			var promises = [];
			promises.push(whois());
			promises.push(haveibeenpwned());
			//promises.push(googleSearch());
			promises.push(ssl());

			$q.all(promises)
			.then(function(result) {
				// Processing all requests results
				for (var i = result.length - 1; i >= 0; i--) {
					var url = result[i].config.url;
					if (url.indexOf('whois')>-1){
						vm.watchResult.WHOIS.content = result[i].data;
					} else if (url.indexOf('buildwith')>-1){
						vm.watchResult.BUILTWITH.content = result[i].data;
					} else if (url.indexOf('ssl')>-1){
						vm.watchResult.SSL.content = result[i].data;
					} else if (url.indexOf('shodan')>-1){
						vm.watchResult.SHODAN.content = result[i].data;
					} else if (url.indexOf('googleSearch')>-1){
						vm.watchResult.FILES.content = data;
					} else if (url.indexOf('haveibeenpwned')>-1){
						vm.watchResult.HAVEIBEENPWNED.content = result[i].data;
					}
				}
				vm.hasResult = true;
			});
		}
	}
})();
