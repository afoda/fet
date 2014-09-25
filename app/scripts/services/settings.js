'use strict';

/**
 * @ngdoc service
 * @name fetApp.settings
 * @description
 * # settings
 * Configurable parameters for the exercise.
 */
angular.module('fetApp')
  .factory('settings', function () {
      var service = {};

      var mode = 1;

      service.getMode = function() {
        return mode;
      }

      service.nextMode = function() {
        mode = mode + 1;
        if (mode >= 8)
          mode = 1;
      }

      service.prevMode = function() {
        mode = mode - 1;
        if (mode <= 0)
          mode = 7;
      }

      service.questionCount = 50;
      service.harmonicNotes = 2;
      service.cadenceInterval = 5;

      service.tempo = 100;

      // Range of notes used in questions
      service.low = 40;
      service.high = 79;

      // Range of root notes used for setting the key
      service.keyLow = 60;
      service.keyHigh = 71;

      return service;
  });
