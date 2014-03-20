'use strict';

angular.module('soapyApp')
  .controller('PlanCtrl', function ($scope, $firebase, Passid) {
    $scope.addPlan = function (e){
  			if(e.keyCode !== 13) {
    		return;
    		};
	 		var myID = Passid.getID();
	 		var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/plan');
	 		patientRef.push($scope.plan);
	 		$scope.plain = "makeGreen";
 		}
  });
