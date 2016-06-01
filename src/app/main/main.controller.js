(function() {
	'use strict';

	angular.module('ncwatch')
	.controller('MainController', MainController);

	/** @ngInject */
	function MainController(WhoIsService, GoogleDorksService, $q) {
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

				/*resources().then(function(response) {
				var resources = response.data;
				var length = resources.length;

				var defer = $q.defer();
				var promises = [];

				angular.forEach(resources, function(value) {
					promises.push(MyApi.details(resources[i].key));
				});

				$q.all(promises).then(function() {
					$scope.total = $scope.results.reduce(function(a, b) { return a + b; }, 0);        
				});
			}*/
			
		}

	}
})();
