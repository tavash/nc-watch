(function () {
    'use strict';

    angular.module('ncwatch')
        .controller('ToolsController', ToolsController);

    /** @ngInject */
    function ToolsController($location) {
        var vm = this;

        vm.switchTab = switchTab;

        vm.tabs = [
            {
                name: 'Crawl',
                url: '/crawl'
            },
            {
                name: 'Have I Been Pwned',
                url: '/haveibeenpwned'
            },
            {
                name: 'Who is',
                url: '/whois'
            },
            {
                name: 'Shodan',
                url: '/shodan'
            },
            {
                name: 'Google Dorks',
                url: '/googledorks'
            },
            {
                name: 'SSL',
                url: '/ssl'
            },
            {
                name: 'Build With',
                url: '/buildwith'
            }
        ]

        function switchTab(index) {
            $location.path('/tools' + vm.tabs[index].url);
        }
    }
})();
