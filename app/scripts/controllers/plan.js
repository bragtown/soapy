'use strict';

angular.module('soapyApp')
  .	controller('PlanCtrl', function ($scope, $firebase, Passid) {
    $scope.Plans = [
      'thing1',
      'thing2',
      'thing3',
      'thing4',
      'thing5'
    ];

    var selectedPlans = [];

    $scope.addPlan = function(myPlan){
      //if assessment is in selectedAssessments, take it away. 
      //if assessment is not in selectedAssessments, put it in.
      for (var i in selectedPlans){
        if (selectedPlans[i] === myPlan){
          selectedPlans.splice(i, 1);
          console.log(selectedPlans);
          return;
        }
      };
      selectedPlans.push(myPlan);
      console.log(selectedPlans);
    };
    $scope.submit = function(){
      var myID = Passid.getID();
      var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/plan');
      visitRef.set(selectedPlans);
    };

  });
