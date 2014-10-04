'use strict';

/**
 * @ngdoc function
 * @name fetApp.controller:StartCtrl
 * @description
 * # StartCtrl
 * Manages entry to the main app.
 * Informs user of asset loading status and allows access when all files have been loaded.
 */
angular.module('fetApp')
  .controller('StartCtrl', ['$scope', 'midiLoader', function ($scope, midiLoader) {
    $scope.filesLoaded = false;

    midiLoader.loadFiles().then(function () {
      $scope.filesLoaded = true;
    });
  }]);
