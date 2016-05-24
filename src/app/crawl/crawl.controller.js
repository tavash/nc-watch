(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('CrawlController', CrawlController);

	/** @ngInject */
	function CrawlController(CrawlService) {
		var vm = this;

		vm.crawl = crawl;
		vm.haveIBeenPwned = haveIBeenPwned;

		function crawl(){
			var prefix = 'http://';
			var url = vm.url;
			if (vm.url.substr(0, prefix.length) !== prefix)
			{
				url = prefix + vm.url;
			}

			CrawlService.crawl(url).success(function(res){
				vm.crawlResult = res;
			});
		}

		function haveIBeenPwned(){

			CrawlService.haveIBeenPwned(vm.email).success(function(res){
				vm.haveIBeenPwnedResult = res;
			});
		}
	}
})();
