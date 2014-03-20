'use strict';

angular.module('soapyApp')
  .controller('SubjectiveCtrl', function ($scope, $firebase, Passid) {
  		$scope.addSubjective = function (e){
  			if(e.keyCode !== 13) {
    		return;
    		};
	 		var myID = Passid.getID();
	 		var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/subjective');
	 		patientRef.push($scope.subjective);
	 		$scope.plain = "makeGreen";
 		}
  });
