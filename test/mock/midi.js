'use strict';

angular.module('mock.midi', [])

  .constant('MIDI', {
      chordOn : function() {},
      chordOff : function() {},
      loadPlugin : function(args) {
        args.callback();
      }
    });
