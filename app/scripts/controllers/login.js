'use strict';

angular.module('soapyApp')
  .controller('LoginCtrl', function ($scope, $firebase, $firebaseSimpleLogin, $location) {
  	$scope.email = null;
  	$scope.password = null;
  	$scope.submit = function(){
	  	var soapRef = new Firebase('https://soapnotes.firebaseio.com');
		var auth = new FirebaseSimpleLogin(soapRef, function(error, user) {
			auth.login('password', {
	  			email: $scope.email,
	  			password: $scope.password,
	  			rememberMe: true
			});
		});
		if (auth != null){
			$location.path('/main');
		};
	};
	$scope.password = function(e){
		if(e.keyCode !== 13) {
    		  return;
		};
		$scope.submit;
	};
  });
