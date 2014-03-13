'use strict';

angular.module('soapyApp')
  .controller('CheckinCtrl', function ($scope, $firebase) {
  	var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients');
  	$scope.patients = $firebase(patientRef);
  	$scope.patient = {
  		name: "",
      date: ""
  	};
  	$scope.addPatient = function(e){
    	if(e.keyCode !== 13) {
    		return;
    	};
      var boolName;
      var patientList = $scope.patients.$getIndex();
      for (var i = 0; i < patientList.getLength && boolName; i ++){
        var patientId = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientList[i]);
        patientId.on('value', function (snapshot){
          boolName = snapshot.val().body === $scope.patient.name;
          console.log(boolName);
          if (boolName){
            return;
          };
        });
      };
    	if (!boolName){
        console.log('in checkname checker');
      	$scope.patients.$add({
      		body: $scope.patient.name
      	});
      };
    };
    $scope.addDate = function(e){
      if(e.keyCode !== 13) {
        return;
      };
      //get firebase id for my current scope.patient.name
      var currentPatient;
      var patientList = $scope.patients.$getIndex();
      for (var patient in patientList){
        var patientId = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientList[patient]);
        patientId.on('value', function (snapshot){
          if(snapshot.val().body === $scope.patient.name){
            currentPatient = patientId;
          }
        });
      }

      $scope.thisPatient = $firebase(patientId);
      $scope.thisPatient.$add({
        body: $scope.patient.date
      });
    };
});
