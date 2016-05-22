(function() {
  'use strict';

  angular
    .module('ncwatch')
    .controller('CrawlController', CrawlController);

  /** @ngInject */
  function CrawlController(CrawlService, cfpLoadingBar, $timeout) {
    var vm = this;

    vm.crawl = crawl;
    vm.start = function() {
      cfpLoadingBar.start();
    };

    vm.complete = function () {
      cfpLoadingBar.complete();
    }


    // fake the initial load so first time users can see it right away:
    vm.start();
    vm.fakeIntro = true;
    $timeout(function() {
      vm.complete();
      vm.fakeIntro = false;
    }, 750);

    function crawl(){
      var prefix = 'http://';
      var url = vm.url;
      if (vm.url.substr(0, prefix.length) !== prefix)
      {
          url = prefix + vm.url;
      }

      CrawlService.crawl(url).success(function(res){
        vm.result = res;
      });
    }
  }
})();
