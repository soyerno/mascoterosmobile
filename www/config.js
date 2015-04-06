'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'angleApp';
	// var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];
	var applicationModuleVendorDependencies = [
		'ngRoute',
		'ngAnimate',
		'ngStorage',
		'ngTouch',
		'ngCookies',
		'pascalprecht.translate',
		'ui.bootstrap',
		'ui.router',
		'restangular',
		'oc.lazyLoad',
		'cfp.loadingBar',
		'ngSanitize',
		'ngResource',
		'ui.utils',
		'ui.checkbox',
		'imageuploaders',
		'ngStorage',
		'petgenres',
		'pettypes',
		'angularMoment',
		'angular-datepicker',
		'djds4rce.angular-socialshare',
		'geolocation',
		'textAngular',
		'uiGmapgoogle-maps',
		'ngCordova'
	];
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
