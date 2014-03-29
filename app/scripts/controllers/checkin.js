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

    //add a patient.
    $scope.addPatient = function(e){
     if(e.keyCode !== 13) {
       return;
     };
     var getID = function(){
      var CurPatient;
       patientRef.on('value', function (snapshot){
        snapshot.forEach(function (childsnapshot){
          if ($scope.patient.name === childsnapshot.val().body){
            CurPatient = childsnapshot.name();
          };
        });
        
       });
       if (CurPatient){
          return CurPatient;
        }
        else{
          return undefined;
        }
     }
     if (getID()){
      $scope.currentPatient = getID();
      $scope.patientIn = true;
      console.log(getID());
     }
     else{
      $scope.patients.$add({
         body: $scope.patient.name
      });
      console.log(getID());
      $scope.currentPatient = getID();
      $scope.patientIn = true;
     };
     //if patientRef already contains patient, store the patients id.
     //if it does not, create a new patient and store its id.
   };
    $scope.addDate = function(){
      var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+$scope.currentPatient);
      var myVisit = $firebase(visitRef);
      myVisit.$add({
        visit: $scope.dt.toString()
      });
      var visitNumber = 0;
      visitRef.on('value', function (snapshot){
        if (snapshot.val().visitNumber){
          visitNumber = snapshot.val().visitNumber;
        };
        snapshot.forEach(function (childsnapshot){
          if (childsnapshot.val().visit === $scope.patient.date){
            $scope.currentVisit = childsnapshot.name();
          };
        });
      });
      $scope.visitAddress = ('https://soapnotes.firebaseIO.com/patients/'+$scope.currentPatient+'/'+$scope.currentVisit);
      $scope.visitAdded = true;

      //update visit Number
      var visitNumRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+$scope.currentPatient+'/visitNumber');
      visitNumRef.set(visitNumber + 1);
    };

    $scope.addTimeIn = function(e){
     if(e.keyCode !== 13) {
        return;
     };
     var myVisit = $scope.visitAddress;
     var timeInRef = new Firebase(myVisit+'/timeIn');
     timeInRef.set($scope.patient.timeIn);
   };

   $scope.addTimeOut = function(e){
     if(e.keyCode !== 13) {
        return;
     };
     var myVisit = $scope.visitAddress;
     var timeOutRef = new Firebase(myVisit+'/timeOut');
     timeOutRef.set($scope.patient.timeOut);
   };

   $scope.addTherapist = function(e){
     if(e.keyCode !== 13) {
        return;
     };
     var myVisit = $scope.visitAddress;
     var therapistRef = new Firebase(myVisit+'/Therapist');
     therapistRef.set($scope.patient.Therapist);
   };
  
    //predictive text:
    //get a list of all current patients
    //use an event listener to compare to list
    //display a list of possible canidates
    //on click fill out information.
//     var patientNames = [];
//     patientRef.on('value', function (snapshot){
//       snapshot.forEach(function (childsnapshot){
//         patientNames.push(childsnapshot.val().body);
//         childsnapshot.forEach(function (grandchildsnapshot){
//           console.log(grandchildsnapshot.val().Therapist);
//         });
//       });
//     });

//datepicker js
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.enabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[2];
  //end datepicker js
});
