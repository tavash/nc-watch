(function() {
	'use strict';

	angular.module('ncwatch')
	.controller('MainController', MainController);

	/** @ngInject */
	function MainController(toastr) {
		var vm = this;

		vm.watch = watch;

		function watch(){
			console.log(vm.domain);
			vm.watchResult = [{'title':'BuiltWith', 'element': 4},{'title':'HaveIBeenPwned', 'element': 1},
							  {'title':'File', 'element': 4},{'title':'Shodan', 'element': 4},
							  {'title':'SSL', 'element': 4},{'title':'WhoIs', 'element': 4}	];
		}
	}
})();
