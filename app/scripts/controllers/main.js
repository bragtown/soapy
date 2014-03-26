'use strict';

angular.module('soapyApp')
.controller('MainCtrl', function ($scope, $firebase, Passid, $location) {
	var patientsRef = new Firebase('https://soapnotes.firebaseIO.com/patients/');
	$scope.patients = $firebase(patientsRef);	
	$scope.patientVisits = function (id){
		$scope.patientId = id;
		var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/' + id);
		$scope.myPatient = $firebase(patientRef);
		$scope.myPatientVisits = []
		patientRef.on('value', function (snapshot){
			snapshot.forEach(function (childsnapshot){
				if(childsnapshot.val().visit){
					$scope.myPatientVisits.push([childsnapshot.ref().name(), childsnapshot.val().visit]);
				}
			});
		});
		console.log($scope.myPatientVisits);
	};
	$scope.currentVisit = function (id){
		var visitId = $scope.patientId + '/'+id;
		Passid.setID(visitId);
		Passid.setPatient($scope.patientId);
		console.log($scope.patientId);
		$location.path('/subjective');
	};
	
	// var patientNames = [];
	// var visits = [];
 //    patientsRef.on('value', function (snapshot){
 //      snapshot.forEach(function (childsnapshot){
 //      	if childsnapshot.val().upToDate === true{
	//         patientNames.push(childsnapshot.val().body);
	//         childsnapshot.forEach(function (grandchildsnapshot){
	//         	if grandchildsnapshot.val().subComplete === true{
	//         		visits.push(grandchildsnapshot.val().subComplete)
	//     		}
	//         });
 //        }
 //      });
 //    });
});
