'use strict';

/**
 * @ngdoc overview
 * @name fetApp
 * @description
 * # fetApp
 *
 * Main module of the application.
 * Contains controllers for settings, sets, and questions.
 */
angular
  .module('fetApp', ['ui.router'])

  // lodash dependency injection
  .constant('_', window._)

  // MIDI.js dependency injection
  .constant('MIDI', window.MIDI)

  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/setup');

    $stateProvider

      .state('setup', {
        url: '/setup',
        templateUrl: 'views/setup.html',
      })

      .state('playing', {
        url: '/exercise',
        templateUrl: 'views/playing.html',
      })

      .state('finished', {
        url: '/exercise',
        templateUrl: 'views/finished.html',
      });

  }]);
