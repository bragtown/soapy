'use strict';

describe('Controller: ObjectiveCtrl', function () {

  // load the controller's module
  beforeEach(module('soapyApp'));

  var ObjectiveCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ObjectiveCtrl = $controller('ObjectiveCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
