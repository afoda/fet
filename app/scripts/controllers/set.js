'use strict';

/**
 * @ngdoc function
 * @name fetApp.controller:SetCtrl
 * @description
 * # SetCtrl
 * Controller of the running exercise.
 * Interfaces between the set service and the exercise view.
 */
angular.module('fetApp')
  .controller('SetCtrl',
      ['$scope', '$state', '$document', 'settings', 'sound', 'set', 'musicTheory',
      function ($scope, $state, $document, settings, sound, set, musicTheory) {

    // Reset the exercise
    set.resetExercise();

    // Variables from the set to be used in the view
    $scope.stats = set.stats;

    // Notes selected by the user for the answer
    $scope.selectedNotes = [];

    $scope.playQuestion = function(withCadence) {
      var cadenceDuration = 0;
      if (withCadence) {
        var cadence = musicTheory.cadence(set.root, settings.getMode());
        cadenceDuration = sound.playCadence(cadence);
      }
      sound.playChords([set.question.notes], 1/2, cadenceDuration);
    }

    $scope.clearSelectedNotes = function () {
      $scope.selectedNotes = [];
    };

    function finishQuestion() {
      var keyChanged = set.submitAnswer($scope.selectedNotes);
      $scope.clearSelectedNotes();
      $scope.playQuestion(keyChanged);
      if (set.finished)
        $state.go('finished');
    }

    $scope.selectNote = function(degree) {
      $scope.selectedNotes.push(degree);
      if ($scope.selectedNotes.length == settings.harmonicNotes)
        finishQuestion();
    };

    function handleKeypress(e) {
      if (e.keyCode >= 49 && e.keyCode <= 56) {
        $scope.selectNote(e.keyCode - 48);
        $scope.$apply();
      }
    }

    $document.on('keypress', handleKeypress);
    $scope.$on('$destroy',function(){
      $document.off('keypress', handleKeypress);
    })

    $scope.playQuestion(true);

  }]);
