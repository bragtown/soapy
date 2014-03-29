'use strict';

angular.module('soapyApp')
  .controller('EvaluationCtrl', function ($scope, $firebase, Passid) {
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
  $scope.setBirthDate = function() {
    var evalRef = new Firebase("https://soapnotes.firebaseIO.com/patients/" + patientID + "/birthdate");
    var DOB = $scope.dt;
    evalRef.set($scope.dt.toString());
  }
  $scope.setInjury = function(e) {
    if(e.keyCode !== 13) {
          return;
    };
    var injuryRef = new Firebase("https://soapnotes.firebaseIO.com/patients/" + patientID + "/injury");
    injuryRef.set($scope.condition);
  };
  $scope.addGoal = function(e){
    if(e.keyCode !== 13) {
          return;
    };
    console.log('this is happening')
    var goalRef = new Firebase("https://soapnotes.firebaseIO.com/patients/" + patientID + "/goals");
    goalRef.push($scope.goal);
  }

  var patientID = Passid.getPatient();
  var goalsRef = new Firebase("https://soapnotes.firebaseIO.com/patients/" + patientID + "/goals");
  $scope.patientGoals = [];
  goalsRef.on('value', function (snapshot){
    snapshot.forEach(function (childsnapshot){
      $scope.patientGoals.push([childsnapshot.val(), childsnapshot.ref().name()]);
    });
    console.log($scope.patientGoals);
  });
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[2];
  $scope.isDOBCollapsed = true;
  $scope.isInjuryCollapsed = true;
  $scope.isGoalsCollapsed = true;
});

  
