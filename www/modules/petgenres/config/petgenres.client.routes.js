'use strict';

//Setting up route
angular.module('petgenres').config(['$stateProvider',
	function($stateProvider) {
		// Petgenres state routing
		$stateProvider.
		state('listPetgenres', {
			url: '/petgenres',
			templateUrl: 'modules/petgenres/views/list-petgenres.client.view.html'
		}).
		state('createPetgenre', {
			url: '/petgenres/create',
			templateUrl: 'modules/petgenres/views/create-petgenre.client.view.html'
		}).
		state('viewPetgenre', {
			url: '/petgenres/:petgenreId',
			templateUrl: 'modules/petgenres/views/view-petgenre.client.view.html'
		}).
		state('editPetgenre', {
			url: '/petgenres/:petgenreId/edit',
			templateUrl: 'modules/petgenres/views/edit-petgenre.client.view.html'
		});
	}
]);