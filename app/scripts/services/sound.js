'use strict';

/**
 * @ngdoc service
 * @name fetApp.sound
 * @description
 * # sound
 * Domain specific wrapper for MIDI.js.
 * Exposes functions to play chords, cadences, etc.
 *
 */
angular.module('fetApp')
  .factory('sound', ['MIDI', 'musicTheory', function sound(MIDI, musicTheory) {

    var service = {};

    function playChord(chord, duration, delay) {
      // Sounds a chord for a given period

      MIDI.chordOn(0, chord, 127, delay);
      MIDI.chordOff(0, chord, delay + duration);
    }

    service.playChords = function(chords, noteValue, delay, tempo) {
      // Play a sequence of chords at a uniform pace

      noteValue = noteValue || 1/4;
      delay = delay || 0;
      tempo = tempo || 100;

      var t = musicTheory.noteDuration(noteValue, tempo);
      for (var i = 0; i < chords.length; i++)
        playChord(chords[i], t, delay + i*t);

      // Return the time til the sequence is done playing
      return delay + (chords.length * t);
    };

    return service;

  }]);
