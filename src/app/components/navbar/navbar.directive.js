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
      /*var vm = this;*/

      // "vm.creationDate" is available by directive option "bindToController: true"
    /*  vm.relativeDate = moment(vm.creationDate).fromNow();*/
    }
  }

})();
