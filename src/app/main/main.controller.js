(function() {
	'use strict';

	angular
	.module('ncwatch')
	.controller('MainController', MainController);

	/** @ngInject */
	function MainController($timeout, toastr) {
		var vm = this;

		vm.showToastr = showToastr;
		vm.crawl = crawl;

		function showToastr() {
			toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
		}

		function crawl(){
			
		}
	}
})();
