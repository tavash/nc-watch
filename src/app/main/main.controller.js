(function() {
	'use strict';

	angular.module('ncwatch')
	.controller('MainController', MainController);

	/** @ngInject */
	function MainController(WhoIsService, GoogleDorksService) {
		var vm = this;

		vm.watch = watch;

		function watch(){

			WhoIsService.whois(vm.domain).success(function(result){vm.whoisResult = result;
			
			vm.watchResult = [{'title':'BuiltWith', 'content': 4},
							  {'title':'HaveIBeenPwned', 'content': 1},
							  {'title':'File', 'content': 4},
							  {'title':'Shodan', 'content': 4},
							  {'title':'SSL', 'content': 4},
							  {'title':'WhoIs', 'content': vm.whoisResult}]; });


			
		}
	}
})();
