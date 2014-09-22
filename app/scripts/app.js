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

  .config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('setup', {
        url: '/',
        templateUrl: 'views/setup.html',
      })

      .state('playing', {
        url: '/',
        templateUrl: 'views/playing.html',
      })

      .state('finished', {
        url: '/',
        templateUrl: 'views/finished.html',
      });

  }]);
