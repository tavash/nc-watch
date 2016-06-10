(function() {
  'use strict';

  angular
    .module('ncwatch')
    .controller('ProcedureController', ProcedureController);

  /** @ngInject */
  function ProcedureController($scope) {
    var vm = this;
    
    vm.redirectTo = redirectTo;

    function redirectTo(page){
    	vm.page = 'app/procedure/procedure.'+ page +'.html';
    }

    $scope.$on('$viewContentLoaded', function () {
        vm.page = 'app/procedure/procedure.presentation.html';
    })
  }
})();
