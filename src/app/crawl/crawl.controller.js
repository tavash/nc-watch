(function() {
  'use strict';

  angular
    .module('ncwatch')
    .controller('CrawlController', CrawlController);

  /** @ngInject */
  function CrawlController(CrawlService) {
    var vm = this;

    vm.crawl = crawl;

    function crawl(){

      CrawlService.crawl(vm.url).success(function(res){
        vm.result = res;
      });
    }
  }
})();
