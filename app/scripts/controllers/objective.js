'use strict';

angular.module('soapyApp')
  .controller('ObjectiveCtrl', function ($scope, $firebase, Passid) {
	$scope.oneAtATime = true;

	$scope.setDistance = function (e, distance){
		if(e.keyCode !== 13) {
    		  return;
		};
		distanceRef.set(distance);
	};

	

	$scope.addProgress = function (e, inProgress){
	  if(e.keyCode !== 13) {
        return;
      };
   	  progressRef.push(inProgress);
	};

	$scope.addItem = function() {
	  var newItemNo = $scope.items.length + 1;
	  $scope.items.push('Item ' + newItemNo);
	};

	var myID = Passid.getID();
	var distanceRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/distance');
    var visitRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/');
    var myPatientID = Passid.getPatient();
    var visitNumRef = new Firebase("https://soapnotes.firebaseIO.com/patients/" + myPatientID + "/visitNumber");
    var progressRef = new Firebase("https://soapnotes.firebaseIO.com/patients/" + myPatientID + "/progress");
    var patientRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myPatientID+'/goals');


    var checkVisitNum = function(){
    	var isProgressTime = false;
    	visitNumRef.on('value', function (snapshot){
    		if (snapshot.val() == 7 || snapshot.val() == 13 || snapshot.val() == 19 || snapshot.val == 30){
    			isProgressTime = true;
    		}
    	});
    	return isProgressTime;
    };
    $scope.isInterval = checkVisitNum();
    console.log(checkVisitNum());

    $scope.patientProgress = [];
    progressRef.on('value', function (snapshot){
    	$scope.patientProgress =[];
      snapshot.forEach(function (childsnapshot){
        $scope.patientProgress.push([childsnapshot.val(), childsnapshot.ref().name()]);
      });
    });

    $scope.goals = [];
    patientRef.on('value', function (snapshot){
    	snapshot.forEach(function (childsnapshot){
    		$scope.goals.push(childsnapshot.val());
    	});
    });
	if (distanceRef) {
		distanceRef.on('value', function (snapshot){
			$scope.distanceVal = snapshot.val();
		});
		$scope.value = $scope.distanceVal;
	};

//code for dropdown menu
	var deviceRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/device');
	if (deviceRef){
		deviceRef.on('value', function (snapshot){
			$scope.deviceVal = snapshot.val();
		});
		$scope.myDevice = $scope.deviceVal;
	}
	$scope.aDevice = function (device){
		$scope.myDevice = device;
		setDevice(device);
	}
	var setDevice = function(device){
		deviceRef.set(device);
	}
	$scope.custDevice = function (e, mydevice){
		if(e.keyCode !== 13) {
    		  return;
		};
		setDevice(mydevice);
	}
	$scope.devices = [1,2,3,4,5];

	var AssistRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/assist');
	if (AssistRef){
		AssistRef.on('value', function (snapshot){
			$scope.assistVal = snapshot.val();
		});
		$scope.myAssist = $scope.assistVal;
	}
	$scope.aAssist = function (assist){
		$scope.myAssist = assist;
		setAssist(assist);
	}
	var setAssist = function(assist){
		AssistRef.set(assist);
	}
	$scope.custAssist = function (e, myassist){
		if(e.keyCode !== 13) {
    		  return;
		};
		setAssist(myassist);
	}
	$scope.assists = [1,2,3,4,5,6];

	var GaitDescriptionRef = new Firebase('https://soapnotes.firebaseIO.com/patients/'+myID+'/GaitDescription');
	if (GaitDescriptionRef){
		GaitDescriptionRef.on('value', function (snapshot){
			$scope.GaitDescriptionVal = snapshot.val();
		});
		$scope.myGaitDescription = $scope.GaitDescriptionVal;
	}
	$scope.aGaitDescription = function (GaitDescription){
		$scope.myGaitDescription = GaitDescription;
		setGaitDescription(GaitDescription);
	}
	var setGaitDescription = function(GaitDescription){
		GaitDescriptionRef.set(GaitDescription);
	}
	$scope.custGaitDescription = function (e, mygaitDescription){
		if(e.keyCode !== 13) {
    		  return;
		};
		setGaitDescription(mygaitDescription);
	}
	$scope.GaitDescriptions = [1,2,3,4,5,6];


  });
