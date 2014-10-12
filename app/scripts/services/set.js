'use strict';

/**
 * @ngdoc service
 * @name fetApp.set
 * @description
 * # set
 * Stores the state of the running exercise.
 */
angular.module('fetApp')
  .factory('set', ['musicTheory', 'settings', function (musicTheory, settings) {

    var service = {};

    service.resetExercise = function() {
      service.question = {};
      service.finished = false;
      service.stats = {
        completedQuestions: 0,
        currentScore: 0
      };
      newQuestion();
    }

    function newQuestion() {

      var changeKey = service.stats.completedQuestions % settings.cadenceInterval == 0;
      if (changeKey)
        randomizeKey();

      service.question.notes = [];
      service.question.degrees = [];

      var scale = musicTheory.modeNotes(settings.getMode(), service.root, settings.low, settings.high);
      var noteDegrees = _.sample(scale, settings.harmonicNotes);

      for (var i = 0; i < noteDegrees.length; i++) {
        service.question.notes.push(noteDegrees[i][0]);
        service.question.degrees.push(noteDegrees[i][1]);
      }

      return changeKey;
    }

    function randomizeKey() {
      var allKeys = _.range(settings.keyLow, settings.keyHigh + 1);
      service.root = _.sample(allKeys);
    }

    function scoreAnswer(answer) {
      function quotient(notes) {
        // Identify equivalent notes
        return _.map(notes, function (note) {
          return note == 8 ? 1 : note;
        });
      }

      function uniqueDegrees(notes) {
        return _.uniq(quotient(notes));
      }

      var realAnswer = uniqueDegrees(service.question.degrees).sort();
      var userAnswer = uniqueDegrees(answer).sort();

      if (_.isEqual(realAnswer, userAnswer))
        service.stats.currentScore += 1;
    }

    /**
     * @ngdoc method
     * @name submitAnswer
     * @methodOf fetApp.set
     * @param {Array} answer The list of scale degrees (1-8) chosen by the user.
     * @returns {Boolean} Whether the key changed on generating the new question.
     */
    service.submitAnswer = function(answer) {
      scoreAnswer(answer);

      service.stats.completedQuestions += 1;

      if (service.stats.completedQuestions < settings.questionCount) {
        return newQuestion();
      }
      else {
        service.finished = true;
      }
    }

    return service;

  }]);
