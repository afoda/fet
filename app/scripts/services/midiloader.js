'use strict';

/**
 * @ngdoc service
 * @name fetApp.midiLoader
 * @description
 * # midiLoader
 * Wrapper for MIDI.js loadPlugin function, which loads sound resources.
 * Ensures that soundfounts are only loaded once, by returning a resolved
 * promise in the case of subsequent calls.
 */
angular.module('fetApp')
  .factory('midiLoader', ['MIDI', '$q', function (MIDI, $q) {

    var service = {};

    // This flag is used to ensure that MIDI.loadPlugin is only called once
    var filesLoaded = false;

    service.loadFiles = function() {
      if (filesLoaded) {
        // If we have already loaded the soundfonts, return a resolved promise
        var deferred = $q.defer();
        deferred.resolve(null);
        return deferred.promise;
      }
      else {
        var deferred = $q.defer();
        MIDI.loadPlugin({
          soundfontUrl: "bower_components/midi/soundfont/",
          instrument: "acoustic_grand_piano",
          callback: function () {
            filesLoaded = true;
            // MIDI.js only calls this function on success.
            deferred.resolve(null);
          }
        });
        return deferred.promise;
      }
    };

    return service;

  }]);
