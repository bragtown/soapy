'use strict';

describe('Controller: PlanCtrl', function () {

  // load the controller's module
  beforeEach(module('soapyApp'));

  var PlanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanCtrl = $controller('PlanCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
