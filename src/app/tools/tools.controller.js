(function () {
	'use strict';

	angular.module('ncwatch')
	.controller('ToolsController', ToolsController);

	/** @ngInject */
	function ToolsController($scope, $state) {
		var vm = this;

		vm.switchTab = switchTab;

		vm.tabs = [
		{
			name: 'Analyzer',
			url: 'analyzer',
			state: 'tools.analyzer'
		},
		{
			name: 'Have I Been Pwned',
			url: 'haveibeenpwned',
			state: 'tools.haveibeenpwned'
		},
		{
			name: 'Who is',
			url: 'whois',
			state: 'tools.whois'
		},
		{
			name: 'Shodan',
			url: 'shodan',
			state: 'tools.shodan'
		},
		{
			name: 'Google Dorks',
			url: 'googledorks',
			state: 'tools.googledorks'
		},
		{
			name: 'SSL',
			url: 'ssl',
			state: 'tools.ssl'
		},
		{
			name: 'Built With',
			url: 'builtwith',
			state: 'tools.builtwith'
		},
			{
				name: 'DNS BL',
				url: 'dnsbl',
				state: 'tools.dnsbl'
			}
		]

		function switchTab(index) {
            $state.go(vm.tabs[index].state);
        }

        $scope.$on('$stateChangeSuccess', function (event, toState) {
        	if(toState.name.indexOf('tools')>-1)
        		vm.currentTab = toState.data.selectedTab;
        });
    }
})();
