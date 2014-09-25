'use strict';

/**
 * @ngdoc function
 * @name fetApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the settings panel
 */
angular.module('fetApp')
  .controller('SettingsCtrl', ['settings', '$scope', function (settings, $scope) {

    $scope.questionCount = settings.questionCount;
    $scope.harmonicNotes = settings.harmonicNotes;
    $scope.cadenceInterval = settings.cadenceInterval;
    $scope.mode = settings.getMode();

    // Allow changing of mode from the view
    $scope.nextMode = settings.nextMode;
    $scope.prevMode = settings.prevMode;

    $scope.$watch(settings.getMode, function (mode) {
      $scope.mode = mode;
    });

    // Write scope variables back to service variables.
    // To be called when inputs change.
    $scope.writeBack = function() {
      settings.questionCount = $scope.questionCount;
      settings.harmonicNotes = $scope.harmonicNotes;
      settings.cadenceInverval = $scope.cadenceInterval;
    };

  }]);
