(function() {
	'use strict';

	angular
	.module('ncwatch')
	.config(config);

	/** @ngInject */
	function config($logProvider, $mdThemingProvider, toastrConfig, cfpLoadingBarProvider) {
    // Enable log
    cfpLoadingBarProvider.includeSpinner = false;
    $logProvider.debugEnabled(true);
    $mdThemingProvider.theme('default').primaryPalette('blue',{'default':'500'}).accentPalette('orange');
    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
}

})();
