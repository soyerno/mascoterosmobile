'use strict';

//Setting up route
angular.module('shelters').config(['$stateProvider',
	function($stateProvider) {
		// Shelters state routing
		$stateProvider.
		state('app.listShelters', {
			url: '/shelters',
			templateUrl: 'modules/shelters/views/list-shelters.client.view.html'
		}).
		state('app.createShelter', {
			url: '/shelters/create',
			templateUrl: 'modules/shelters/views/create-shelter.client.view.html'
		}).
		state('app.viewShelter', {
			url: '/shelters/:shelterId',
			templateUrl: 'modules/shelters/views/view-shelter.client.view.html'
		}).
		state('app.editShelter', {
			url: '/shelters/:shelterId/edit',
			templateUrl: 'modules/shelters/views/edit-shelter.client.view.html'
		});
	}
]);
