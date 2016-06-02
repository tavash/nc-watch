(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('CrawlController', CrawlController);

	/** @ngInject */
	function CrawlController(CrawlService, $mdDialog, $mdToast, HowToMessages, InfosMessages) {
		var vm = this;
		vm.crawl = crawl;
		vm.prefixeSelected = 'http://';
		vm.CRAWL_HOW_TO = HowToMessages.crawl;
		vm.CRAWL_MESSAGE_INFO = InfosMessages.crawl;

		vm.isCrawl = false;
		vm.isRobots = false;
		vm.isHtaccess = false;
		vm.isSitemap = false;

		vm.crawlResult = {};
		vm.robotsTxtResult = {};
		vm.htaccess = '';
		vm.sitemap = '';

		function crawl() {
			var url = vm.prefixeSelected + vm.url;
			vm.isCrawl = false;
			vm.isRobots = false;
			vm.isHtaccess = false;
			vm.isSitemap = false;

			// Crawl de l'index du site
			CrawlService.crawl(url).success(function(res){
				if (res.err) {
					vm.isCrawl = false;
					vm.crawlResult = {};
					showErreurDialog(res.err);
				} else {
					getSitemap(url);
					getRobots(url);
					getHtaccess(url);
					vm.crawlResult = res;
					delete vm.crawlResult.body;
					vm.isCrawl = true;
				}
			});
		}

		function getSitemap(url) {

			var sitemapUrl = url + '/sitemap.xml';
			vm.sitemap = '';

			CrawlService.crawl(sitemapUrl).success(function(res){
				if (res.err) {
					vm.isSitemap = false;
				} else {
					if (res.statusCode == 200) {
						if (sitemapUrl == res.request.uri.href) {
							vm.sitemap = 'Sitemap <b>trouvé</b> à l\'adresse <a href="' + sitemapUrl + '" target="_blank">' + sitemapUrl + '</a>';
						} else {
							vm.sitemap = 'Sitemap <b>trouvé</b> à l\'adresse <a href="' + res.request.uri.href + '" target="_blank">' + res.request.uri.href + '</a>';
						}
						
					} else {
						vm.sitemap = 'Sitemap <b>introuvable</b> à l\'adresse <a href="' + sitemapUrl + '" target="_blank">' + sitemapUrl + '</a>';
					}
					vm.isSitemap = true;
				}
			});
		}

		// Récupération du Robots.txt
		function getRobots(url) {
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

		// Récupération du Htaccess
		function getHtaccess(url) {
			vm.htaccess = '';
			var urlHtaccess = url + '/.htaccess';
			CrawlService.crawl(urlHtaccess).success(function(res) {
				if (!res.err) {
					vm.isHtaccess = true;
					switch (res.statusCode) {
						case 403:
						vm.htaccess = 'Forbidden';
						break;
						case 404:
						vm.htaccess = 'Not Found';
						break;
						case 200:
						if (urlHtaccess == res.request.uri.href) {
							vm.htaccess = 'Accessible';
						} else {
							vm.htaccess = 'Forbidden';
						}
						break;
					}
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
				$mdToast.simple().position('top')
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
