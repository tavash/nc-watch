(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('CrawlController', CrawlController);

	/** @ngInject */
	function CrawlController(CrawlService) {
		var vm = this;
		vm.crawl = crawl;
		vm.prefixeSelected = 'http://';

		function crawl(){
			var url = vm.prefixeSelected + vm.url;

			CrawlService.crawl(url).success(function(res){
				vm.crawlResult = res;
				vm.isCrawl = true;
			});

			// Robots.txt
			CrawlService.crawl(url + '/robots.txt').success(function(res) {
				console.log(res);
				vm.robotsTxtResult = res;
				vm.isRobotsTxt = true;
			});

		}
	}
})();
