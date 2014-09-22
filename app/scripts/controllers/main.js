'use strict';

/**
 * @ngdoc function
 * @name fetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fetApp
 */
angular.module('fetApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
