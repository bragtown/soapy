'use strict';

angular.module('soapyApp')
  .controller('SubjectiveCtrl', function ($scope, $firebase, Passid) {
 		console.log(Passid.getID());
  });
