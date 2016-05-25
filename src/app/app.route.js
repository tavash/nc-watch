(function() {
	'use strict';

	angular
	.module('ncwatch')
	.config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('procedure', {
      url: '/procedure',
      templateUrl: 'app/procedure/procedure.html',
      controller: 'ProcedureController',
      controllerAs: 'procedure'
    })
    .state('tools', {
      url: '/tools',
      templateUrl: 'app/tools/tools.html',
      controller: 'ToolsController',
      controllerAs: 'tools'
    })
    .state('tools.crawl', {
      url: '/crawl',
      views: {
        '@': {
          templateUrl: 'app/tools/crawl/crawl.html',
          controller: 'CrawlController',
          controllerAs: 'crawl',
        }
      }
    })
    .state('tools.haveibeenpwned', {
      url: '/haveibeenpwned',
      views: {
        '@': {
          templateUrl: 'app/tools/haveibeenpwned/haveibeenpwned.html',
          controller: 'HaveIBeenPwnedController',
          controllerAs: 'haveibeenpwned',
        }
      }
    });


    $urlRouterProvider.otherwise('/');
  }

})();
