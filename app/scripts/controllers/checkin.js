'use strict';

angular.module('soapyApp')
  .controller('CheckinCtrl', function ($scope, $firebase) {
  	var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/');
  	$scope.patients = $firebase(patientRef);
  	$scope.patient = {
  		name: "",
      date: "",
      timeIn:"",
      timeOut:"",
      Therapist:""
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
            console.log($scope.currentPatient);
          };
        });
      };
    	if (!$scope.addName){
      	$scope.patients.$add({
      		body: $scope.patient.name
      	});
        patientList = $scope.patients.$getIndex();
        $scope.currentPatient = patientList[(patientList.length-1)];
        console.log($scope.currentPatient);
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
      console.log($scope.currentPatient);
      $scope.currentPatient.$add({
        visit:$scope.patient.date
      }); 
    };
    $scope.addTimeIn = function(e){
     if(e.keyCode !== 13) {
        return;
     };
     var patientId = $scope.currentPatient;
     console.log(patientId);
     var currentRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId);
     var myPatient = $firebase(currentRef);
     var visitId = myPatient.$getIndex();
     var visitpleasework = visitId[(visitId.length-2)];
     var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId+'/'+visitpleasework+'/TimeIn');
     visitRef.set($scope.patient.timeIn);
    };
    $scope.addTimeOut = function(e){
     if(e.keyCode !== 13) {
        return;
     };
     var patientId = $scope.currentPatient;
     var currentRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId);
     var myPatient = $firebase(currentRef);
     var visitId = myPatient.$getIndex();
     var visitpleasework = visitId[(visitId.length-2)];
     var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId+'/'+visitpleasework+'/TimeOut');
     visitRef.set($scope.patient.timeOut);
    };
    $scope.addTherapist = function(e){
     if(e.keyCode !== 13) {
        return;
     };
     var patientId = $scope.currentPatient;
     var currentRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId);
     var myPatient = $firebase(currentRef);
     var visitId = myPatient.$getIndex();
     var visitpleasework = visitId[(visitId.length-2)];
     var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+patientId+'/'+visitpleasework+'/Therapist');
     visitRef.set($scope.patient.Therapist);
    };
    //predictive text:
    //get a list of all current patients
    //use an event listener to compare to list
    //display a list of possible canidates
    //on click fill out information.
    var patientNames = [];
    patientRef.on('value', function (snapshot){
      snapshot.forEach(function (childsnapshot){
        patientNames.push(childsnapshot.val().body);
        childsnapshot.forEach(function (grandchildsnapshot){
          console.log(grandchildsnapshot.val().Therapist);
        });
      });
    });
});
