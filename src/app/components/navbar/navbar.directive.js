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
		function NavbarController(moment) {
			var vm = this;

			vm.navbarElements = [
			{
				name: 'Home',
				route: 'home'
			},
			{
				name: 'Procedure',
				route: 'procedure'
			},
			{
				name: 'Tools',
				route: 'tools.crawl'
			},
			{
				name: 'Contact',
				route: 'contact'
			}];
    	}
  }

})();
