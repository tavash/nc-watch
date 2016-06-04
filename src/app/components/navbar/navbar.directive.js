(function() {
	'use strict';

	angular
	.module('ncwatch')
	.directive('navbar', Navbar);

	/** @ngInject */
	function Navbar() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/navbar/navbar.html',
			scope: {},
			controller: NavbarController,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		/** @ngInject */
		function NavbarController($state, $scope) {
			var vm = this;
			
			$scope.$on('$stateChangeSuccess', function (event, toState) {
				vm.state = $state.current.name;
				console.log(vm.state);
			});
		}
	}

})();
