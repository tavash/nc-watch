(function () {
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
                        controllerAs: 'crawl'
                    }
                }
            })
            .state('tools.haveibeenpwned', {
                url: '/haveibeenpwned',
                views: {
                    '@': {
                        templateUrl: 'app/tools/haveibeenpwned/haveibeenpwned.html',
                        controller: 'HaveIBeenPwnedController',
                        controllerAs: 'haveibeenpwned'
                    }
                }
            })
            .state('tools.whois', {
                url: '/whois',
                views: {
                    '@': {
                        templateUrl: 'app/tools/whois/whois.html',
                        controller: 'WhoIsController',
                        controllerAs: 'whois'
                    }
                }
            })
            .state('tools.shodan', {
                url: '/shodan',
                views: {
                    '@': {
                        templateUrl: 'app/tools/shodan/shodan.html',
                        controller: 'ShodanController',
                        controllerAs: 'shodan'
                    }
                }
            })
            .state('tools.googledorks', {
                url: '/googledorks',
                views: {
                    '@': {
                        templateUrl: 'app/tools/googledorks/googledorks.html',
                        controller: 'GoogleDorksController',
                        controllerAs: 'googledorks',
                    }
                }
            })
            .state('tools.buildwith', {
                url: '/buildwith',
                views: {
                    '@': {
                        templateUrl: 'app/tools/buildwith/buildwith.html',
                        controller: 'BuildwithController',
                        controllerAs: 'buildwith',
                    }
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/contact/contact.html',
                controller: 'ContactController',
                controllerAs: 'contact'
            });
        $urlRouterProvider.otherwise('/');
    }

})();
