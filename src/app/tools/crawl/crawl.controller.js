(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('CrawlController', CrawlController);

	/** @ngInject */
	function CrawlController(CrawlService, $mdDialog, $mdToast) {
		var vm = this;
		vm.crawl = crawl;
		vm.prefixeSelected = 'http://';

		vm.isCrawl = false;
		vm.isRobots = false;

		function crawl() {
			var url = vm.prefixeSelected + vm.url;
			vm.isCrawl = false;
			vm.isRobots = false;
			CrawlService.crawl(url).success(function(res){
				if (res.err) {
					vm.isCrawl = false;
					vm.crawlResult = {};
					showErreurDialog(res.err);
				} else {
					vm.crawlResult = res;
					vm.isCrawl = true;
				}
			});
			CrawlService.getRobots(url).success(function(res) {
				if (res.err) {
					vm.isRobots = false;
					vm.robotsTxtResult = {};
					showToastRobotsErreur();
				} else {
					vm.robotsTxtResult = res;
					vm.isRobots = true;
				}
			});
		}

		function showErreurDialog(err) {
			$mdDialog.show(
				$mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Erreur')
				.textContent(err + ' ' + vm.prefixeSelected + vm.url)
				.ok('Fermer')
				);
		}

		function showToastRobotsErreur() {
			$mdToast.show(
				$mdToast.simple()
				.textContent('Aucun Robots.txt n\'a été trouvé'));
		}
	}

	angular.module('ncwatch').filter('decodeURL', function() {
		return function(input) {
			if (input) {
				return decodeURIComponent(input);
			} else {
				return '';
			}
		}
	});

	angular.module('ncwatch').filter('join', function() {
		return function(input) {
			if (input) {
				return input.join(', ');
			} else {
				return '';
			}
		}
	});
})();
