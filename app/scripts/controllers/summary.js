'use strict';

/**
 * @ngdoc function
 * @name fetApp.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Provides data for the summary view
 */
angular.module('fetApp')
  .controller('SummaryCtrl', ['set', 'settings', '$scope', function (set, settings, $scope) {
    $scope.questionCount = settings.questionCount;
    $scope.score = set.stats.currentScore;
  }]);
