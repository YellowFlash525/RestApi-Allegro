var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function() {
  $http.get('/events').success(function(response) {
    console.log("I got the data I requested");
    $scope.events = response;
    $scope.event = "";
  });
};

refresh();

}]);﻿