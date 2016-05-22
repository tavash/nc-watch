(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var $timeout;
    var toastr;

    beforeEach(module('ncwatch'));
    beforeEach(inject(function(_$controller_, _$timeout_, _toastr_) {
      
      spyOn(_toastr_, 'info').and.callThrough();

      vm = _$controller_('MainController');
      toastr = _toastr_;
    }));


    it('should show a Toastr info and stop animation when invoke showToastr()', function() {
      vm.showToastr();
      expect(toastr.info).toHaveBeenCalled();
      expect(vm.classAnimation).toEqual('');
    });

  });
})();
