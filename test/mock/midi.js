'use strict';

/**
 * @ngdoc overview
 * @name mock.midi
 * @description
 * # mock.midi
 *
 * Provides a mock of MIDI.js which doesn't have side effects.
 */
angular.module('mock.midi', [])

  .constant('MIDI', {
      chordOn : function() {},
      chordOff : function() {},
      loadPlugin : function(args) {
        args.callback();
      }
    });
