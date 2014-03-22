'use strict';

angular.module('soapyApp', [
  'ngSanitize',
  'ngRoute',
  'firebase',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/checkin', {
        templateUrl: 'views/checkin.html',
        controller: 'CheckinCtrl'
      })
      .when('/subjective', {
        templateUrl: 'views/subjective.html',
        controller: 'SubjectiveCtrl'
      })
      .when('/plan', {
        templateUrl: 'views/plan.html',
        controller: 'PlanCtrl'
      })
      .when('/objective', {
        templateUrl: 'views/objective.html',
        controller: 'ObjectiveCtrl'
      })
      .when('/assessment', {
        templateUrl: 'views/assessment.html',
        controller: 'AssessmentCtrl'
      })
      .when('/evaluation', {
        templateUrl: 'views/evaluation.html',
        controller: 'EvaluationCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
