'use strict';

describe('Controller: CheckinCtrl', function () {

  // load the controller's module
  beforeEach(module('soapyApp'));

  var CheckinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckinCtrl = $controller('CheckinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
