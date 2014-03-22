'use strict';

angular.module('soapyApp')
  .controller('LoginCtrl', function ($scope, $firebase, $firebaseSimpleLogin) {
  	$scope.email = null;
  	$scope.password = null;
  	$scope.submit = function(){
	  	var soapRef = new Firebase('https://soapnotes.firebaseio.com');
		var auth = new FirebaseSimpleLogin(soapRef, function(error, user) {
			auth.login('password', {
	  			email: $scope.email,
	  			password: $scope.password
			});
		});
	};
  });
