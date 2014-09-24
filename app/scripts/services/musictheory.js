'use strict';

/**
 * @ngdoc service
 * @name fetApp.musicTheory
 * @description
 * # musicTheory
 * Implements music-theory concepts such as modes and chords.
 */
angular.module('fetApp')
  .service('musicTheory', ['_', function musicTheory(_) {

    var DIATONIC_SCALE = [2,2,1,2,2,2,1];
    var MODES_NAMES = ['Ionian', 'Aeolian'];

    function sum(array) {
        if (array.length === 0) return 0;
        return _(array).foldl(function(acc, x) { return acc + x; });
    }

    function modeDegree(degree, root, mode, scale) {
        // The first instance of the given scale degree above the root.

        var scale = scale || DIATONIC_SCALE;

        var steps = scale.concat(scale).slice(mode-1, mode-1 + degree-1);
        var interval = sum(steps);

        return root + interval;
    }

    function allDegreeNotes(degree, root, mode, low, high, scale) {
        // All instances of the given mode degree in the interval [low, high]

        var scale = scale || DIATONIC_SCALE;

        var ref = modeDegree(degree, root, mode, scale);
        // First instance of this scale degree above low.
        var l = ref - 12 * Math.floor((ref - low) / 12);

        var notes = [];
        for (var n = l; n <= high; n += 12)
            notes.push(n);

        return notes;
    }

    function modeNotes(mode, root, low, high, scale) {
        // Notes in the given mode based at ``root`` in the interval [low, high]
        // Returns a list of lists with the note value and its scale degree.
        var scale = scale || DIATONIC_SCALE;

        var allModes = [];
        for (var i = 1; i <= 7; i++) {
            var md = allDegreeNotes(i, root, mode, low, high, scale);
            _.each(md, function(x) { allModes.push([x,i]); });
        }

        // Sort by note values
        allModes.sort(function(a, b) {
              return a[0] > b[0] ? 1 : -1;
        });

        return allModes;
    }

    function chord(root, mode, chordNumber, seventh) {
        // Creates triads or seventh chords in the given mode of the diatonic scale.

        var seventh = seventh || false;

        var chordRoot = modeDegree(chordNumber, root, mode);
        var chordMode = (mode - 1 + chordNumber - 1) % 7 + 1;

        var notes = [
            modeDegree(1, chordRoot, chordMode),
            modeDegree(3, chordRoot, chordMode),
            modeDegree(5, chordRoot, chordMode)
        ];

        if (seventh)
            notes.push(modeDegree(7, chordRoot, chordMode));

        return notes;
    }

    // Service API

    this.modeNotes = modeNotes;
    this.chord = chord;

  }]);
