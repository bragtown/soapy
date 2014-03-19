'use strict';

angular.module('soapyApp')
.controller('MainCtrl', function ($scope, $firebase, Passid, $location) {
	var patientsRef = new Firebase('https://soapnotes.firebaseIO.com/patients/');
	$scope.patients = $firebase(patientsRef);	
	$scope.patientVisits = function (id){
		$scope.patientId = id;
		var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/' + id);
		$scope.myPatient = $firebase(patientRef);
		// $scope.visitId = $scope.myPatient.$getIndex();
		// $scope.visitRefs = [];
		// for (var visit in $scope.visitId){
		// 	var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/' + id +'/'+ $scope.visitId[visit]);
		// 	$scope.visitRefs.push($firebase(visitRef));
		// };
	};
	$scope.currentVisit = function (id){
		var visitId = $scope.patientId + '/'+id;
		Passid.setID(visitId);
		$location.path('/subjective');
	};
});
