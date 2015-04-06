'use strict';

//Setting up route
angular.module('vets').config(['$stateProvider',
	function($stateProvider) {
		// Vets state routing
		$stateProvider.
		state('app.listVets', {
			url: '/vets',
			templateUrl: 'modules/vets/views/list-vets.client.view.html'
		}).
		state('app.createVet', {
			url: '/vets/create',
			templateUrl: 'modules/vets/views/create-vet.client.view.html'
		}).
		state('app.viewVet', {
			url: '/vets/:vetId',
			templateUrl: 'modules/vets/views/view-vet.client.view.html'
		}).
		state('app.editVet', {
			url: '/vets/:vetId/edit',
			templateUrl: 'modules/vets/views/edit-vet.client.view.html'
		});
	}
]);
