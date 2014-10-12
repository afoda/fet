'use strict';

angular.module('fetApp')
  .filter('modeName', function() {
    var modeDict = {
      1: "Ionian",
      2: "Dorian",
      3: "Phrygian",
      4: "Lydian",
      5: "Mixolyd.",
      6: "Aeolian",
      7: "Locrian",
    };
    return function(input) {
      return modeDict[input];
    };
  });
