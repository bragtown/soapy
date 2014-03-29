'use strict';

angular.module('soapyApp')
  .controller('AssessmentCtrl', function ($scope, $firebase, Passid) {
    $scope.Assessments = [
      'thing1',
      'thing2',
      'thing3',
      'thing4',
      'thing5',
      'thing6',
    ];

    var selectedAssessments = [];

    $scope.addAssessment = function(myAssessment){	
    	for (var i in selectedAssessments){
    		if (selectedAssessments[i] === myAssessment){
    			selectedAssessments.splice(i, 1);
    			console.log(selectedAssessments);
    			return;
    		}
    	};
    	selectedAssessments.push(myAssessment);
    	console.log(selectedAssessments);
    };
    $scope.submit = function(){
	    var myID = Passid.getID();
	    var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/assessment');
	    visitRef.set(selectedAssessments);
    };
  });
