'use strict';

angular.module('soapyApp')
  .controller('CheckinCtrl', function ($scope, $firebase) {
  	var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/');
  	$scope.patients = $firebase(patientRef);
  	$scope.patient = {
  		name: "",
      date: "",
      timeIn:""
  	};
  	$scope.addPatient = function(e){
    	if(e.keyCode !== 13) {
    		return;
    	};
      var patientList = $scope.patients.$getIndex();
      for (var patient in patientList){
        var patientId = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientList[patient]);
        patientId.on('value', function (snapshot){
          var boolName = snapshot.val().body === $scope.patient.name;
          if (boolName){
            $scope.addName = true;
            $scope.currentPatient = patientList[patient];
          };
        });
      };
    	if (!$scope.addName){
      	$scope.patients.$add({
      		body: $scope.patient.name
      	});
        patientList = $scope.patients.$getIndex();
        $scope.currentPatient = patientList[(patientList.length-1)];
      };
    };
    $scope.addDate = function(e){
      if(e.keyCode !== 13) {
        return;
      };
      if ($scope.currentPatient === undefined){
        alert('Please ENTER patient name')
        return;
      }
      var patientId = $scope.currentPatient;
      $scope.passId = patientId;
      var currentRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId);
      $scope.passCurrentRef = currentRef;
      $scope.currentPatient = $firebase(currentRef);
      $scope.currentPatient.$add({
        visit:$scope.patient.date
      }); 
    };
    $scope.addTimeIn = function(e){
     if(e.keyCode !== 13) {
        return;
      };
      $scope.passCurrentRef.on('value', function (snapshot){
          $scope.currentVisit = snapshot.exportVal();
        }); 
      var patientVisit = $scope.currentVisit;
      console.log(patientVisit);
      var patientId = $scope.passId;
      console.log(patientId);
      var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId+'/'+patientVisit);  
      $scope.patientVisit = $firebase(visitRef);
      $scope.patientVisit.$add({
        timeIn:$scope.patient.timeIn
      });
    }
});
