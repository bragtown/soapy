'use strict';

describe('Service: Passid', function () {

  // load the service's module
  beforeEach(module('soapyApp'));

  // instantiate service
  var Passid;
  beforeEach(inject(function (_Passid_) {
    Passid = _Passid_;
  }));

  it('should do something', function () {
    expect(!!Passid).toBe(true);
  });

});
