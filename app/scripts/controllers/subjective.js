'use strict';

angular.module('soapyApp')
  .controller('SubjectiveCtrl', function ($scope, $firebase, Passid) {
  		$scope.addSubjective = function (e){
  			if(e.keyCode !== 13) {
    		  return;
    		};
	 		  patientRef.set($scope.subjective);
        var subjectiveComplete = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/subComplete');
        subjectiveComplete.set(true);
	 		  $scope.plain = "makeGreen";
 		}
    var myID = Passid.getID();
    var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/subjective');
    patientRef.on('value', function (snapshot){
      $scope.subjectiveVal = snapshot.val();
    });
    if ($scope.subjectiveVal){
      $scope.subjective = $scope.subjectiveVal;
    }
  });
