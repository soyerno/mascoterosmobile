/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

angular.module('core').config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('/home');

  //
  // Application Routes
  // -----------------------------------
  $stateProvider
    .state('app', {
      // url: '/',
      abstract: true,
      template: '<div data-ui-view autoscroll="false" ng-class="app.viewAnimation" class="content-wrapper"></div>',
      resolve: helper.resolveFor('modernizr', 'icons')
    })
    .state('app.home', {
      url: '/home',
      // abstract: true,
      // templateUrl: helper.basepath('app.html'),
      templateUrl: 'modules/core/views/home.client.view.html'
    })
    .state('app.timeline', {
      url: '/timeline',
      // abstract: true,
      // templateUrl: helper.basepath('app.html'),
      templateUrl: 'modules/core/views/timeline.client.view.html'
    })
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;

}]);
