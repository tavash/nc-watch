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
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'app/tools/tools.html',
                        controller: 'ToolsController',
                        controllerAs: 'tools'
                    }
                }
            })
            .state('tools.analyzer', {
                url: '/analyzer',
                templateUrl: 'app/tools/analyzer/analyzer.html',
                controller: 'AnalyzerController',
                controllerAs: 'analyzer',
                data: {
                    'selectedTab': 0
                }
            })
            .state('tools.haveibeenpwned', {
                url: '/haveibeenpwned',
                templateUrl: 'app/tools/haveibeenpwned/haveibeenpwned.html',
                controller: 'HaveIBeenPwnedController',
                controllerAs: 'haveibeenpwned',
                data: {
                    'selectedTab': 1
                }
            })
            .state('tools.whois', {
                url: '/whois',
                templateUrl: 'app/tools/whois/whois.html',
                controller: 'WhoIsController',
                controllerAs: 'whois',
                data: {
                    'selectedTab': 2
                }
            })
            .state('tools.shodan', {
                url: '/shodan',
                templateUrl: 'app/tools/shodan/shodan.html',
                controller: 'ShodanController',
                controllerAs: 'shodan',
                data: {
                    'selectedTab': 3
                }
            })
            .state('tools.googledorks', {
                url: '/googledorks',
                templateUrl: 'app/tools/googledorks/googledorks.html',
                controller: 'GoogleDorksController',
                controllerAs: 'googledorks',
                data: {
                    'selectedTab': 4
                }
            })
            .state('tools.ssl', {
                url: '/ssl',
                templateUrl: 'app/tools/ssl/ssl.html',
                controller: 'SslController',
                controllerAs: 'ssl',
                data: {
                    'selectedTab': 5
                }
            })
            .state('tools.builtwith', {
                url: '/builtwith',
                templateUrl: 'app/tools/builtwith/builtwith.html',
                controller: 'BuiltwithController',
                controllerAs: 'builtwith',
                data: {
                    'selectedTab': 6
                }
            })
            .state('tools.dnsbl', {
                url: '/dnsbl',
                templateUrl: 'app/tools/dnsbl/dnsbl.html',
                controller: 'DnsBlController',
                controllerAs: 'dnsbl',
                data: {
                    'selectedTab': 7
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