(function() {
  'use strict';

  angular
    .module('ncwatch')
    .controller('ProcedureController', ProcedureController);

  /** @ngInject */
  function ProcedureController() {
    var vm = this;
    
    vm.redirectTo = redirectTo;

    function redirectTo(page){
    	vm.page = 'app/procedure/procedure.'+ page +'.html';
    }
  
  }
})();
